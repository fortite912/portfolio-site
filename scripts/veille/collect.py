#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Veille technologique automatisee — epreuve E5 du BTS SIO (competence
« Organiser son developpement professionnel »).

Etape 5 de la methode (collecte) et premier tri de l'etape 6 :
  - lit les flux RSS et Atom des sources suivies (SOURCES) ;
  - classe chaque article dans les themes de veille (THEMES) ;
  - accumule les articles retenus dans data/veille-feed.json, avec la
    liste des sources, leur etat et les regles de tri appliquees : le
    portfolio affiche ce fichier tel quel.

Ce script collecte et trie. Il ne lit pas a ma place et n'ecrit aucune
synthese : la revue hebdomadaire se fait avec scripts/veille/revue.py,
les syntheses sont redigees a la main.

Execute chaque jour par .github/workflows/veille.yml.
Bibliotheque standard uniquement : aucune dependance a installer.
"""
import hashlib
import html
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "data" / "veille-feed.json"

MAX_AGE_DAYS = 120      # fenetre de veille : au-dela, un article sort du fichier
MAX_ITEMS = 400         # garde-fou seulement : la fenetre suffit a borner le fichier
# Texte sur lequel porte le tri, conserve tel quel : depuis le 02/11/2026,
# un article est reclasse plus tard sur le meme texte qu'a sa collecte.
TEXT_LIMIT = 1500
TIMEOUT = 20
USER_AGENT = "veille-sean-fritsch/1.0 (+https://portfolio-site-ten-pearl-61.vercel.app)"

# ---------------------------------------------------------------- sources
# Etape 4 de la methode. Chaque source dit pourquoi elle est suivie et
# depuis quand : l'historique git de cette liste montre son evolution.
#   always       themes attribues d'office (alertes, publications d'outils)
#   titlePrefix  ajoute devant les titres nus des publications GitHub
#   skipTitle    versions ignorees (preversions)
# Preversions des outils : "12.0.0-rc2" (GLPI) comme "6.0.0beta2" (RT)
PRERELEASE = r"(?i)(?<![a-z])(?:rc|beta|alpha)\d*\b"

SOURCES = [
    {
        "id": "certfr-alertes",
        "name": "CERT-FR",
        "kind": "Alertes",
        "type": "Institutionnel",
        "lang": "fr",
        "url": "https://www.cert.cyber.gouv.fr/alerte/feed/",
        "site": "https://www.cert.cyber.gouv.fr/",
        "since": "2026-09-23",
        "why": "Alertes officielles de l'ANSSI : une alerte concerne toujours un administrateur, elle est gardée d'office.",
        "always": ["alerte"],
    },
    {
        "id": "certfr-avis",
        "name": "CERT-FR",
        "kind": "Avis",
        "type": "Institutionnel",
        "lang": "fr",
        "url": "https://www.cert.cyber.gouv.fr/avis/feed/",
        "site": "https://www.cert.cyber.gouv.fr/",
        "since": "2026-09-23",
        "why": "Avis de vulnérabilité : seuls ceux qui touchent les thèmes suivis sont retenus.",
    },
    {
        "id": "itconnect",
        "name": "IT Connect",
        "kind": "Blog technique",
        "type": "Presse spécialisée",
        "lang": "fr",
        "url": "https://www.it-connect.fr/feed/",
        "site": "https://www.it-connect.fr/",
        "since": "2026-09-23",
        "why": "Actualité et tutoriels d'administration systèmes et réseaux, en français.",
    },
    {
        "id": "zataz",
        "name": "Zataz",
        "kind": "Actualité cyber",
        "type": "Presse spécialisée",
        "lang": "fr",
        "url": "https://www.zataz.com/feed/",
        "site": "https://www.zataz.com/",
        "since": "2026-09-23",
        "why": "Incidents et fuites de données : hameçonnage, vols d'identifiants.",
    },
    {
        "id": "cybermalveillance",
        "name": "Cybermalveillance.gouv.fr",
        "kind": "Actualités",
        "type": "Institutionnel",
        "lang": "fr",
        "url": "https://www.cybermalveillance.gouv.fr/feed/atom-flux-actualites",
        "site": "https://www.cybermalveillance.gouv.fr/",
        "since": "2026-11-02",
        "why": "Arnaques et hameçonnage côté utilisateurs : matière pour la sensibilisation faite en support.",
    },
    {
        "id": "ms-entra",
        "name": "Microsoft Entra",
        "kind": "Blog éditeur",
        "type": "Éditeur",
        "lang": "en",
        "url": "https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/board?board.id=microsoft-entra-blog",
        "site": "https://techcommunity.microsoft.com/category/microsoft-security/blog/microsoft-entra-blog",
        "since": "2026-11-02",
        "why": "Identité, MFA et accès conditionnel chez Microsoft : prolonge le déploiement MFA du stage.",
    },
    {
        "id": "ms-security",
        "name": "Microsoft Security",
        "kind": "Blog éditeur",
        "type": "Éditeur",
        "lang": "en",
        "url": "https://www.microsoft.com/en-us/security/blog/feed/",
        "site": "https://www.microsoft.com/en-us/security/blog/",
        "since": "2026-11-02",
        "why": "Analyses d'attaques sur les identités, l'Active Directory et les certificats.",
    },
    {
        "id": "itsm-tools",
        "name": "ITSM.tools",
        "kind": "Blog spécialisé",
        "type": "Presse spécialisée",
        "lang": "en",
        "url": "https://itsm.tools/feed/",
        "site": "https://itsm.tools/",
        "since": "2026-11-02",
        "why": "Seul média testé qui traite régulièrement de l'IA au service desk et dans l'ITSM : le cœur du thème principal.",
    },
    {
        "id": "spiceworks-ia",
        "name": "Spiceworks",
        "kind": "Communauté — IA",
        "type": "Communauté",
        "lang": "en",
        "url": "https://community.spiceworks.com/tag/artificial-intelligence.rss",
        "site": "https://community.spiceworks.com/tag/artificial-intelligence",
        "since": "2026-11-02",
        "why": "Retours de techniciens et d'administrateurs sur l'IA dans leur travail quotidien : le terrain, pas les annonces.",
    },
    {
        "id": "glpi",
        "name": "GLPI",
        "kind": "Versions",
        "type": "Outil",
        "lang": "en",
        "url": "https://github.com/glpi-project/glpi/releases.atom",
        "site": "https://github.com/glpi-project/glpi/releases",
        "since": "2026-11-02",
        "why": "Outil de gestion de parc et de tickets utilisé en stage : chaque version, surtout de sécurité, est à connaître.",
        "always": ["outils"],
        "titlePrefix": "GLPI ",
        "skipTitle": PRERELEASE,
    },
    {
        "id": "request-tracker",
        "name": "Request Tracker",
        "kind": "Versions",
        "type": "Outil",
        "lang": "en",
        "url": "https://github.com/bestpractical/rt/releases.atom",
        "site": "https://github.com/bestpractical/rt/releases",
        "since": "2026-11-02",
        "why": "Outil de ticketing utilisé en stage à la DISI : versions et correctifs de sécurité.",
        "always": ["outils"],
        "titlePrefix": "Request Tracker ",
        "titleStrip": r"^rt-",
        "skipTitle": PRERELEASE,
    },
]

# Sources lues sans flux : consultees a la main, affichees comme telles.
MANUAL_SOURCES = [
    {
        "name": "ANSSI",
        "kind": "Guides et recommandations",
        "site": "https://cyber.gouv.fr/",
        "since": "2026-09-23",
        "why": "Guides de durcissement (authentification, Active Directory, SSH). Pas de flux exploitable : consulté directement ; ses alertes arrivent par le CERT-FR.",
    },
    {
        "name": "CNIL",
        "kind": "Réglementation",
        "site": "https://www.cnil.fr/",
        "since": "2026-11-02",
        "why": "Cadre légal des données personnelles traitées par un outil de support ou une IA. Lu à la main : son flux, généraliste (agenda, droits des personnes, sanctions), touche rarement mes thèmes.",
    },
]

# Domaines qui ont change : le CERT-FR est passe de cert.ssi.gouv.fr a
# cert.cyber.gouv.fr en octobre 2026. Sans cet alias, chaque alerte etait
# comptee deux fois.
HOST_ALIASES = {"cert.ssi.gouv.fr": "cert.cyber.gouv.fr"}

# ---------------------------------------------------------------- themes
# Etape 2 de la methode : le perimetre de chaque theme, traduit en motifs.
# Motifs "strict" : sigles, casse exacte avec limites de mot (sinon "IA"
# matcherait "via"). Motifs "loose" : insensibles a la casse.

def _rx(spec):
    return [re.compile(p) for p in spec.get("strict", [])] + [
        re.compile(p, re.IGNORECASE) for p in spec.get("loose", [])
    ]


# Theme principal : un signal IA ET un contexte support ou exploitation.
# Avant le 02/11/2026, un signal IA seul suffisait : 41 des 80 articles en
# memoire etaient classes dans ce theme, dont toute l'actualite IA (outils
# de developpement, puces, filigranes...). Avec la regle actuelle : 3.
AI = {
    "strict": [r"\bIA\b", r"\bAI\b", r"\bLLMs?\b", r"\bGPT", r"\bAIOps\b", r"\bgenAI\b",
               r"\bAI-(?:assisted|powered|driven)\b"],
    "loose": [
        r"intelligence artificielle", r"artificial intelligence", r"chatgpt", r"copilot",
        r"\bclaude\b", r"\bmistral\b", r"\bollama\b", r"\bgemini\b", r"chatbots?",
        r"\bagents? (?:ia|autonomes?|conversationnels?)\b", r"\b(?:ai|autonomous) agents?\b",
        r"\bagenti(?:que|c)\b", r"assistants? (?:virtuels?|ia)\b", r"virtual assistants?",
        r"apprentissage automatique", r"machine learning",
        r"agents? (?:virtuels?|conversationnels?)", r"virtual agents?", r"now assist",
    ],
}
# Signaux faibles : ne comptent que dans le titre (un "IA" cite en passant
# dans un temoignage ne fait pas un article sur l'IA).
AI_WEAK = {r"\bIA\b", r"\bAI\b", r"\bclaude\b"}

SUPPORT = {
    # "IT support" en casse exacte : sinon "does it support" correspondrait
    "strict": [r"\bITSM\b", r"\bGLPI\b", r"\bN1\b", r"\bMDM\b", r"\bIT support\b", r"\bITOps\b"],
    "loose": [
        r"help ?desk", r"service ?desk", r"centre de services", r"servicenow",
        r"\bzendesk\b", r"freshservice", r"jira service management", r"\bzammad\b",
        r"support (?:informatique|utilisateurs?|aux utilisateurs|technique|de niveau|N[12]|IT)",
        r"assistance (?:aux )?utilisateurs", r"niveau 1", r"\b(?:tier|level)[ -]?1\b",
        r"first[- ]line support", r"\btickets?\b", r"ticketing",
        r"(?:gestion|tri|traitement|r[ée]solution) des (?:incidents|demandes|tickets)",
        r"incident management", r"service management", r"gestion des services (?:informatiques|IT)",
        r"IT operations", r"exploitation (?:IT|informatique)", r"auto-?rem[ée]diation",
        r"base de connaissances?", r"knowledge base",
        r"journaux d.[ée]v[ée]nements", r"journaux syst[eè]me", r"event logs?", r"\blogs\b",
        r"supervision", r"\bmonitoring\b", r"observabilit[ée]", r"\bobservability\b",
        # Surveiller des agents IA en production ; pas la videosurveillance
        r"(?<![a-zé])surveill(?:er|ance)\b(?! de masse)",
        r"d[ée]pannage", r"troubleshooting",
        r"\bintune\b", r"administrateurs? syst[eè]mes?", r"sysadmins?",
        r"postes? de travail", r"\bendpoints?\b",
        # Administrer des agents IA sur un parc (GPO dediees) releve de l'exploitation
        r"\bGPO\b", r"strat[ée]gies? de groupe", r"group polic(?:y|ies)",
    ],
}

ACCES = {
    "strict": [
        r"\bMFA\b", r"\b2FA\b", r"\bSSH\b", r"\bPKI\b", r"\bTLS\b", r"\bLDAP\b", r"\bAD DS\b",
        r"\bAD CS\b", r"\bGPO\b", r"\bNTLM\b", r"\bPAM\b", r"\bIAM\b", r"\bSSO\b",
        r"\bFIDO2?\b", r"\bTOTP\b",
    ],
    "loose": [
        r"multifacteurs?", r"multi-?factor", r"double authentification", r"authentification",
        r"\bauthentication\b", r"certificat(?:s|e|es)?\b", r"active directory", r"\bentra\b", r"kerberos",
        r"mots? de passe", r"hame[cç]onnage", r"phishing", r"passkeys?", r"cl[ée]s? d.acc[eè]s",
        r"acc[eè]s conditionnel", r"conditional access", r"gestion des identit[ée]s",
        r"identity (?:and access|management|protection)",
        r"identit[ée]s? (?:non humaines?|num[ée]riques?)", r"identifiants? (?:vol[ée]s|de connexion)",
        r"infostealers?", r"comptes? de service", r"comptes? (?:à|a) privil[eè]ges",
        r"identit[ée]s? de service", r"vol (?:de )?(?:leurs |ses |des )?identifiants",
    ],
}
# Formules retirees avant la recherche : "faille exploitable sans
# authentification" decrit une faille, pas le durcissement des acces ;
# "certificats medicaux" n'a rien a voir avec une PKI.
ACCES_NOISE = [re.compile(p, re.IGNORECASE) for p in [
    r"(?:sans|avant|pr[ée]-?)\s*authentification", r"non[- ]authentifi\w*",
    r"contournement de (?:l.)?authentification", r"\bunauthenticated\b",
    r"\bpre-?auth(?:entication)?\b", r"without authentication", r"authentication bypass",
    r"certificats? m[ée]dicaux?", r"photos? d.identit[ée]",
]]
# Motifs trop larges seuls : comptent dans le titre ou accompagnes d'un autre.
# "Phishing" cite en passant dans un guide antivirus ne fait pas un article
# sur les acces.
ACCES_WEAK = {r"\bGPO\b", r"\bTLS\b", r"certificat(?:s|e|es)?\b", r"hame[cç]onnage", r"phishing"}

# Veille outil : les outils du support utilises en stage.
OUTILS = {
    "strict": [r"\bGLPI\b"],
    "loose": [r"request tracker"],
}

_AI, _SUPPORT, _ACCES, _OUTILS = _rx(AI), _rx(SUPPORT), _rx(ACCES), _rx(OUTILS)

THEMES = {
    "ia-support": {
        "label": "IA & support N1",
        "rule": "Un signal IA ET un contexte support ou exploitation. « IA », « AI » ou « Claude » ne comptent que dans le titre.",
        "patterns": {"Signal IA": AI, "Contexte support / exploitation": SUPPORT},
    },
    "acces": {
        "label": "Accès & authentification",
        "rule": "Un motif fort, ou un motif faible (GPO, TLS, certificats, hameçonnage) dans le titre ou avec un autre motif. Les formules qui décrivent une faille (« sans authentification », « contournement de l'authentification »…) et les faux amis (« certificats médicaux », « photo d'identité ») sont retirées avant la recherche.",
        "patterns": {"Motifs": ACCES, "Formules retirées": {"loose": [p.pattern for p in ACCES_NOISE]}},
    },
    "outils": {
        "label": "Outils du support",
        "rule": "Article qui cite GLPI ou Request Tracker, outils de support utilisés en stage, ou nouvelle version de ces outils (préversions ignorées).",
        "patterns": {"Motifs": OUTILS},
    },
    "alerte": {
        "label": "Alerte CERT-FR",
        "rule": "Toute alerte du CERT-FR est gardée, même hors des deux thèmes : une alerte concerne toujours un administrateur.",
        "patterns": {},
    },
}

# ---------------------------------------------------------------- outils

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
    """Date RSS (RFC 822) ou Atom / Dublin Core (ISO 8601)."""
    raw = (raw or "").strip()
    if not raw:
        return None
    try:
        d = parsedate_to_datetime(raw)
    except (TypeError, ValueError, IndexError):
        try:
            d = datetime.fromisoformat(raw.replace("Z", "+00:00"))
        except ValueError:
            return None
    return d if d.tzinfo else d.replace(tzinfo=timezone.utc)


def host_of(link):
    host = urllib.parse.urlsplit(link.strip()).netloc.lower()
    return host[4:] if host.startswith("www.") else host


def canonical(link):
    """Cle stable d'un article : domaine (alias resolus) et chemin, sans
    protocole ni www. Un changement de domaine ne cree plus de doublon."""
    host = host_of(link)
    host = HOST_ALIASES.get(host, host)
    return f"{host}{urllib.parse.urlsplit(link.strip()).path.rstrip('/')}"


def classify(title, body):
    """Themes de veille touches par l'article (hors themes d'office)."""
    text = f"{title} {body}"
    themes = []

    ai = [p for p in _AI if p.search(text)]
    ai_ok = any(p.pattern not in AI_WEAK for p in ai) or any(p.search(title) for p in ai)
    if ai_ok and any(p.search(text) for p in _SUPPORT):
        themes.append("ia-support")

    t, x = title, text
    for noise in ACCES_NOISE:
        t, x = noise.sub(" ", t), noise.sub(" ", x)
    found = [p for p in _ACCES if p.search(x)]
    strong = any(p.pattern not in ACCES_WEAK for p in found)
    weak_in_title = any(p.pattern in ACCES_WEAK and p.search(t) for p in found)
    if strong or weak_in_title or len(found) >= 2:
        themes.append("acces")

    if any(p.search(text) for p in _OUTILS):
        themes.append("outils")
    return themes


def themes_for(src, title, body):
    themes = list(src.get("always", []))
    for t in classify(title, body):
        if t not in themes:
            themes.append(t)
    return themes


# ---------------------------------------------------------------- lecture des flux

ATOM = "{http://www.w3.org/2005/Atom}"
RSS1 = "{http://purl.org/rss/1.0/}"
DC = "{http://purl.org/dc/elements/1.1/}"


def _text(el):
    return "".join(el.itertext()) if el is not None else ""


def entries(root):
    """Articles d'un flux RSS 2.0, RSS 1.0 (RDF) ou Atom.
    Toute autre racine (page HTML, defi anti-robot) leve une erreur : une
    source en panne doit apparaitre en echec, pas en "0 article"."""
    tag = root.tag
    if tag == "rss":
        for it in root.iter("item"):
            yield (
                it.findtext("title"), it.findtext("link"),
                it.findtext("pubDate") or it.findtext(f"{DC}date"),
                it.findtext("description"),
            )
    elif tag == f"{ATOM}feed":
        for e in root.iter(f"{ATOM}entry"):
            link = ""
            for ln in e.findall(f"{ATOM}link"):
                if ln.get("rel", "alternate") == "alternate":
                    link = ln.get("href", "")
                    break
            yield (
                _text(e.find(f"{ATOM}title")), link,
                e.findtext(f"{ATOM}published") or e.findtext(f"{ATOM}updated"),
                _text(e.find(f"{ATOM}content")) or _text(e.find(f"{ATOM}summary")),
            )
    elif tag.endswith("RDF"):
        for it in root.iter(f"{RSS1}item"):
            yield (
                it.findtext(f"{RSS1}title"), it.findtext(f"{RSS1}link"),
                it.findtext(f"{DC}date"), it.findtext(f"{RSS1}description"),
            )
    else:
        raise ValueError(f"pas un flux RSS ou Atom (racine <{tag}>)")


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        return resp.read()


BACKFILL_DAYS = 30


def since_of(src):
    return datetime.fromisoformat(src["since"]).replace(tzinfo=timezone.utc) if src.get("since") else None


def source_cutoff(src, cutoff):
    """A l'ajout d'une source, ses 30 derniers jours sont repris, et
    marques comme tels (backfill) : ils ne comptent pas dans les
    indicateurs, la veille ne s'attribue pas un suivi qu'elle n'a pas fait."""
    since = since_of(src)
    return max(cutoff, since - timedelta(days=BACKFILL_DAYS)) if since else cutoff


def is_prerelease(src, title):
    return bool(src.get("skipTitle") and re.search(src["skipTitle"], title))


def collect_source(src, cutoff):
    """Retourne (articles retenus, cles vues mais ecartees, date du plus
    recent article du flux)."""
    cutoff = source_cutoff(src, cutoff)
    since = since_of(src)
    root = ET.fromstring(fetch(src["url"]))
    items, rejected, latest = [], set(), None
    seen, undated = 0, 0
    for raw_title, raw_link, raw_date, raw_body in entries(root):
        seen += 1
        title = clean(raw_title)
        link = (raw_link or "").strip()
        date = parse_date(raw_date)
        if not date:
            undated += 1
        if not title or not link or not date:
            continue
        latest = max(latest, date) if latest else date
        if is_prerelease(src, title):
            rejected.add(canonical(link))   # purge aussi une preversion deja en memoire
            continue
        if date < cutoff:
            continue
        if src.get("titleStrip"):
            title = re.sub(src["titleStrip"], "", title).strip()
        title = src.get("titlePrefix", "") + title
        text = clean(raw_body, limit=TEXT_LIMIT)
        themes = themes_for(src, title, text)
        key = canonical(link)
        if not themes:
            rejected.add(key)
            continue
        item = {
            "id": hashlib.sha1(key.encode("utf-8")).hexdigest()[:12],
            "title": title,
            "link": link,
            "source": src["name"],
            "sourceId": src["id"],
            "kind": src["kind"],
            "date": date.astimezone(timezone.utc).isoformat(),
            "themes": themes,
            "excerpt": clean(raw_body, limit=220),
            "text": text,
        }
        if since and date < since:
            item["backfill"] = True
        items.append(item)
    # Des articles mais aucune date lisible : format inattendu, la source
    # doit apparaitre en echec plutot qu'en "0 article".
    if seen and undated == seen:
        raise ValueError(f"aucune date lisible sur {seen} articles")
    return items, rejected, latest


# ---------------------------------------------------------------- historique

# Articles anterieurs au champ sourceId : retrouve la source par nom et type.
_LEGACY = {("CERT-FR", "Alertes"): "certfr-alertes", ("CERT-FR", "Avis"): "certfr-avis"}
_BY_ID = {s["id"]: s for s in SOURCES}
_BY_NAME = {s["name"]: s for s in SOURCES}


def source_of(item):
    sid = item.get("sourceId") or _LEGACY.get((item.get("source"), item.get("kind")))
    return _BY_ID.get(sid) or _BY_NAME.get(item.get("source")) or {}


def reclassify(item):
    """Applique les regles du jour a un article deja retenu et encore dans
    la fenetre : une correction du tri vaut aussi pour lui, pas seulement
    pour les articles encore presents dans les flux. Les articles ecartes
    ne sont pas conserves : assouplir une regle ne les fait pas revenir.
    Collectes avant le 02/11/2026, certains n'ont que leur extrait de 220
    caracteres : ils sont reclasses sur cet extrait."""
    src = source_of(item)
    body = item.get("text") or item.get("excerpt", "")
    item["themes"] = themes_for(src, item["title"], body)
    if src.get("id"):
        item.update(sourceId=src["id"], source=src["name"], kind=src["kind"])
        since = since_of(src)
        if since and datetime.fromisoformat(item["date"]) < since:
            item["backfill"] = True
        else:
            item.pop("backfill", None)
    key = canonical(item["link"])
    item["id"] = hashlib.sha1(key.encode("utf-8")).hexdigest()[:12]
    return item


def merge(previous_items, fresh, rejected):
    merged = {}
    for item in previous_items:
        key = canonical(item["link"])
        old = merged.get(key)
        # Doublon de domaine : garder l'adresse actuelle, pas l'ancienne
        if not old or host_of(old["link"]) in HOST_ALIASES:
            merged[key] = item
    for item in fresh:
        merged[canonical(item["link"])] = item
    for key in rejected:
        merged.pop(key, None)
    return merged


# ---------------------------------------------------------------- export

def rules_payload():
    out = {}
    for theme, spec in THEMES.items():
        out[theme] = {
            "label": spec["label"],
            "rule": spec["rule"],
            "patterns": {
                name: pats.get("strict", []) + pats.get("loose", [])
                for name, pats in spec["patterns"].items()
            },
        }
    return out


PUBLIC_FIELDS = ("id", "name", "kind", "type", "lang", "url", "site", "since", "why", "always")


def main():
    now = datetime.now(timezone.utc)
    cutoff = now - timedelta(days=MAX_AGE_DAYS)

    previous = {}
    if OUTPUT.exists():
        previous = json.loads(OUTPUT.read_text(encoding="utf-8"))

    fresh, rejected, report = [], set(), []
    for src in SOURCES:
        entry = {k: src[k] for k in PUBLIC_FIELDS if k in src}
        try:
            found, refused, latest = collect_source(src, cutoff)
            fresh.extend(found)
            rejected |= refused
            entry.update(ok=True, lastItem=latest.isoformat() if latest else None)
            print(f"  ok     {src['id']:<18} {len(found):>3} retenu(s)")
        except Exception as exc:  # une source en panne ne bloque pas les autres
            entry.update(ok=False, error=type(exc).__name__)
            print(f"  ECHEC  {src['id']:<18} {type(exc).__name__}: {exc}")
            print(f"::warning title=Veille::source {src['id']} en echec ({type(exc).__name__})")
        report.append(entry)

    # Panne totale : l'execution doit echouer, sinon elle passerait pour
    # une journee sans nouveaute dans l'historique des executions.
    if not any(s["ok"] for s in report):
        print("Toutes les sources ont echoue.", file=sys.stderr)
        return 1

    merged = merge(previous.get("items", []), fresh, rejected)
    items = []
    for item in merged.values():
        if datetime.fromisoformat(item["date"]) < cutoff:
            continue
        item = reclassify(item)
        if item["themes"] and not is_prerelease(source_of(item), item["title"]):
            items.append(item)
    items.sort(key=lambda i: i["date"], reverse=True)
    if len(items) > MAX_ITEMS:
        print(f"::warning title=Veille::{len(items)} articles, coupe a {MAX_ITEMS}")
        items = items[:MAX_ITEMS]

    stamp = now.replace(microsecond=0).isoformat()
    known = {canonical(i["link"]) for i in previous.get("items", [])}
    added = any(canonical(i["link"]) not in known for i in items)

    payload = {
        # Date de la derniere reecriture du fichier (articles, sources, regles)
        "collectedAt": stamp,
        # Date du dernier article nouveau
        "lastAddedAt": stamp if added else previous.get("lastAddedAt", previous.get("collectedAt")),
        "windowDays": MAX_AGE_DAYS,
        "sources": report,
        "manualSources": MANUAL_SOURCES,
        "rules": rules_payload(),
        "items": items,
    }

    # Ne reecrit le fichier que s'il y a du nouveau : articles, themes,
    # sources (description, etat, jour du dernier article publie) ou regles.
    # Le workflow ne commite que ces jours-la.
    def signature(p):
        return json.dumps({
            "items": [(i["link"], i["themes"], i.get("backfill", False)) for i in p.get("items", [])],
            "sources": [
                {**{k: s.get(k) for k in PUBLIC_FIELDS}, "ok": s.get("ok"), "error": s.get("error"),
                 "lastItem": (s.get("lastItem") or "")[:10]}
                for s in p.get("sources", [])
            ],
            "manual": p.get("manualSources"),
            "rules": p.get("rules"),
        }, ensure_ascii=False, sort_keys=True)

    if signature(payload) == signature(previous):
        print(f"Aucun changement ({len(items)} articles en memoire).")
        return 0

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(items)} article(s) ecrit(s) dans {OUTPUT.name}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
