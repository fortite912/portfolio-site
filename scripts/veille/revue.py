#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Revue de veille hebdomadaire — etape 6 de la methode (tri humain).

La collecte automatique (collect.py) repere des articles ; elle ne les lit
pas. Ce script sert a la revue que je fais moi-meme, une fois par semaine :

  1. il affiche les articles arrives depuis ma derniere revue ;
  2. pour chacun je reponds : r = je le retiens (a approfondir en
     synthese), l = lu sans suite, Entree = vu (titre seulement),
     q = arreter la revue ici ;
  3. il ajoute une entree datee a data/veille-revues.json, que le
     portfolio affiche dans le « Journal des revues ».

Le commit de ce fichier, fait par moi, date la revue : c'est la preuve de
regularite que demande le referentiel (« la veille est reguliere »).

Usage :
    git pull --rebase
    python scripts/veille/revue.py
    git add data/veille-revues.json
    git commit -m "veille: revue du AAAA-MM-JJ"
    git pull --rebase
    git push
"""
import json
import sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FEED = ROOT / "data" / "veille-feed.json"
REVUES = ROOT / "data" / "veille-revues.json"

LOOKBACK_DAYS = 30   # articles plus anciens jamais revus : ignores, pas rattrapes

LABELS = {
    "ia-support": "IA & support N1",
    "acces": "Acces & authentification",
    "outils": "Outils du support",
    "alerte": "Alerte CERT-FR",
}


def load(path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


ANSWERS = {"", "l", "r", "q"}


def ask():
    """Reponse validee : une faute de frappe ne doit pas marquer un article
    comme vu. Ctrl+C ou fin d'entree valent "q" : les reponses deja
    donnees sont gardees."""
    while True:
        try:
            answer = input("    > ").strip().lower()
        except (EOFError, KeyboardInterrupt):
            print()
            return "q"
        if answer in ANSWERS:
            return answer
        print("    Reponse inconnue : r (retenir), l (lu), Entree (vu) ou q (arreter).")


def main():
    feed = load(FEED, {"items": []})
    revues = load(REVUES, [])

    # Un article deja passe en revue ne revient pas, meme s'il a ete
    # collecte en retard (le filtre porte sur les identifiants, pas les dates).
    seen = {i for r in revues for i in r.get("ids", [])}
    horizon = datetime.now(timezone.utc) - timedelta(days=LOOKBACK_DAYS)
    print(f"Derniere revue : {revues[-1]['date']}." if revues else "Premiere revue.")

    todo = [
        i for i in feed["items"]
        if i["id"] not in seen and datetime.fromisoformat(i["date"]) >= horizon
    ]
    todo.sort(key=lambda i: i["date"])
    if not todo:
        print("Aucun nouvel article depuis la derniere revue.")
        return 0

    print(f"{len(todo)} article(s) a passer en revue.")
    print("r = retenir   l = lu sans suite   Entree = vu (titre)   q = arreter\n")

    vus, lus, retenus, ids = 0, 0, [], []
    for n, it in enumerate(todo, 1):
        themes = ", ".join(LABELS.get(t, t) for t in it["themes"])
        print(f"[{n}/{len(todo)}] {it['date'][:10]}  {it['source']}  ({themes})")
        print(f"    {it['title']}")
        print(f"    {it['link']}")
        answer = ask()
        if answer == "q":
            break
        vus += 1
        ids.append(it["id"])
        if answer in ("l", "r"):
            lus += 1
        if answer == "r":
            retenus.append({
                "id": it["id"], "title": it["title"], "link": it["link"],
                "source": it["source"], "date": it["date"][:10],
            })

    if vus == 0:
        print("Revue abandonnee : rien n'est enregistre.")
        return 0

    try:
        note = input(
            "\nCe que je retiens de la semaine, en une phrase (facultatif, mes mots) :\n> "
        ).strip()
    except (EOFError, KeyboardInterrupt):
        note = ""   # la note est facultative : la revue est enregistree sans elle

    entry = {
        "date": date.today().isoformat(), "vus": vus, "lus": lus,
        "retenus": retenus, "ids": ids,
    }
    if note:
        entry["note"] = note
    revues.append(entry)
    # Ecriture atomique : un fichier a moitie ecrit ne remplace jamais l'ancien
    tmp = REVUES.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(revues, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    tmp.replace(REVUES)

    print(f"\nRevue enregistree : {vus} vus, {lus} lus, {len(retenus)} retenu(s).")
    print("Pour la publier :")
    print("    git add data/veille-revues.json")
    print(f'    git commit -m "veille: revue du {entry["date"]}"')
    print("    git pull --rebase")
    print("    git push")
    return 0


if __name__ == "__main__":
    sys.exit(main())
