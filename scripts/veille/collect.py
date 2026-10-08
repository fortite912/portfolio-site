#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Veille technologique automatisee — epreuve E5 du BTS SIO (competence C6).

Lit les flux RSS des sources suivies, retient les articles qui touchent
les deux themes de veille, et les accumule dans data/veille-feed.json.
Execute chaque jour par .github/workflows/veille.yml.

Ce script collecte et trie. Il n'ecrit pas de syntheses : celles-ci sont
redigees a la main apres lecture (voir veilleE5.syntheses dans
lib/experience.ts).

Bibliotheque standard uniquement : aucune dependance a installer.
"""
import hashlib
import html
import json
import re
import sys
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "data" / "veille-feed.json"

MAX_ITEMS = 80          # historique conserve
MAX_AGE_DAYS = 120      # au-dela, un article sort de la fenetre de veille
TIMEOUT = 20
USER_AGENT = "veille-sean-fritsch/1.0 (+https://portfolio-site-ten-pearl-61.vercel.app)"

SOURCES = [
    {
        "name": "CERT-FR",
        "kind": "Alertes",
        "url": "https://www.cert.ssi.gouv.fr/alerte/feed/",
        # Une alerte CERT-FR concerne toujours un administrateur : gardee d'office
        "always": "alerte",
    },
    {"name": "CERT-FR", "kind": "Avis", "url": "https://www.cert.ssi.gouv.fr/avis/feed/"},
    {"name": "CERT-FR", "kind": "Actualite", "url": "https://www.cert.ssi.gouv.fr/actualite/feed/"},
    {"name": "IT Connect", "kind": "Blog technique", "url": "https://www.it-connect.fr/feed/"},
    {"name": "Zataz", "kind": "Actualite cyber", "url": "https://www.zataz.com/feed/"},
]

# Chaque theme : motifs recherches dans le titre et le resume.
# Les sigles courts (IA, MFA, SSH...) sont en casse stricte avec limites
# de mot, sinon "IA" matcherait "via", "media", "social"...
THEMES = {
    "ia-support": {
        "strict": [r"\bIA\b", r"\bLLM", r"\bGPT", r"\bITSM\b", r"\bGLPI\b"],
        "loose": [
            r"intelligence artificielle", r"chatgpt", r"copilot", r"\bclaude\b",
            r"\bagents? (?:ia|autonomes?|conversationnels?)", r"helpdesk",
            r"service desk", r"support (?:informatique|utilisateurs?|technique)",
            r"\btickets?\b", r"automatisation",
        ],
    },
    "acces": {
        "strict": [r"\bMFA\b", r"\b2FA\b", r"\bSSH\b", r"\bPKI\b", r"\bTLS\b",
                   r"\bLDAP\b", r"\bAD DS\b", r"\bGPO\b"],
        "loose": [
            r"multifacteurs?", r"double authentification", r"authentification",
            r"certificats?", r"active directory", r"entra id", r"kerberos",
            r"mots? de passe", r"hame[cç]onnage", r"phishing",
        ],
    },
}

_COMPILED = {
    theme: [re.compile(p) for p in spec["strict"]]
    + [re.compile(p, re.IGNORECASE) for p in spec["loose"]]
    for theme, spec in THEMES.items()
}

# Motifs trop ambigus pour suffire seuls : ils ne comptent que dans le
# titre, ou s'ils accompagnent un autre motif du meme theme.
# Mesure du 28/09 : "IA" cite en passant dans un temoignage de formation
# CCNA le classait a tort en "IA & support". Une regle "titre ou deux
# motifs" appliquee a TOUS les motifs aurait ecarte ce faux positif, mais
# aussi trois articles pertinents (MFA, phishing) : on ne cible que "IA".
WEAK = {r"\bIA\b"}

_TAG = re.compile(r"<[^>]+>")
_SPACES = re.compile(r"\s+")


def clean(text, limit=None):
    """Retire le HTML, decode les entites, normalise les espaces."""
    text = html.unescape(_TAG.sub(" ", text or ""))
    text = _SPACES.sub(" ", text).strip()
    # CERT-FR echappe ses crochets Markdown : \[ ... \]
    text = text.replace("\\[", "[").replace("\\]", "]")
    if limit and len(text) > limit:
        text = text[: limit - 1].rsplit(" ", 1)[0] + "…"
    return text


def parse_date(raw):
    try:
        d = parsedate_to_datetime(raw)
        return d if d.tzinfo else d.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def classify(title, body):
    """Themes touches par l'article. Un motif faible ne suffit pas seul."""
    text = f"{title} {body}"
    themes = []
    for theme, pats in _COMPILED.items():
        found = [p for p in pats if p.search(text)]
        strong = any(p.pattern not in WEAK for p in found)
        weak_in_title = any(p.pattern in WEAK and p.search(title) for p in found)
        if strong or weak_in_title:
            themes.append(theme)
    return themes


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read()


def collect_source(src, cutoff):
    """Retourne (articles retenus, liens vus mais ecartes)."""
    root = ET.fromstring(fetch(src["url"]))
    items, rejected = [], set()
    for it in root.iter("item"):
        title = clean(it.findtext("title"))
        link = (it.findtext("link") or "").strip()
        date = parse_date(it.findtext("pubDate"))
        if not title or not link or not date or date < cutoff:
            continue
        # Classement sur le texte complet : un mot-cle en fin de description
        # compte. Seul l'extrait affiche est tronque.
        full = clean(it.findtext("description"))
        excerpt = clean(it.findtext("description"), limit=220)
        themes = classify(title, full)
        if src.get("always") and src["always"] not in themes:
            themes.insert(0, src["always"])
        if not themes:
            rejected.add(link)
            continue
        items.append(
            {
                "id": hashlib.sha1(link.encode("utf-8")).hexdigest()[:12],
                "title": title,
                "link": link,
                "source": src["name"],
                "kind": src["kind"],
                "date": date.astimezone(timezone.utc).isoformat(),
                "themes": themes,
                "excerpt": excerpt,
            }
        )
    return items, rejected


def main():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=MAX_AGE_DAYS)

    previous = {}
    if OUTPUT.exists():
        previous = json.loads(OUTPUT.read_text(encoding="utf-8"))

    merged = {i["link"]: i for i in previous.get("items", [])}
    report = []
    for src in SOURCES:
        entry = {"name": src["name"], "kind": src["kind"], "url": src["url"]}
        try:
            found, rejected = collect_source(src, cutoff)
            for item in found:
                merged[item["link"]] = item
            # Un article encore present dans le flux mais desormais ecarte
            # (filtre ameliore) quitte la memoire : les corrections de
            # filtre s'appliquent aussi a l'historique.
            for link in rejected:
                merged.pop(link, None)
            entry.update(ok=True, retained=len(found))
            print(f"  ok     {src['name']:<11} {src['kind']:<16} {len(found):>3} retenu(s)")
        except Exception as exc:  # une source en panne ne bloque pas les autres
            entry.update(ok=False, error=type(exc).__name__)
            print(f"  ECHEC  {src['name']:<11} {src['kind']:<16} {type(exc).__name__}: {exc}")
        report.append(entry)

    items = [
        i for i in merged.values()
        if datetime.fromisoformat(i["date"]) >= cutoff
    ]
    items.sort(key=lambda i: i["date"], reverse=True)
    items = items[:MAX_ITEMS]

    # Ne reecrit le fichier que s'il y a du nouveau : le workflow ne
    # commite ainsi que les jours ou la collecte apporte quelque chose.
    def signature(lst):
        return [(i["link"], tuple(i["themes"])) for i in lst]

    if signature(items) == signature(previous.get("items", [])):
        print(f"Aucun nouvel article ({len(items)} en memoire).")
        return 0

    payload = {
        "collectedAt": now.replace(microsecond=0).isoformat(),
        "windowDays": MAX_AGE_DAYS,
        "sources": report,
        "items": items,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(items)} article(s) ecrit(s) dans {OUTPUT.relative_to(ROOT)}")

    if not any(s["ok"] for s in report):
        print("Toutes les sources ont echoue.", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
