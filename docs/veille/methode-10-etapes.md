# Veille en 10 étapes — mode d'emploi

Pour Sean. Ce document explique ce qui tourne tout seul, ce qui reste à ton
compte, et comment le défendre devant le jury de l'E5.

## Ce que dit le référentiel (à savoir citer)

Bloc 1, compétence « Organiser son développement professionnel », indicateur
de performance (texte du référentiel, coquilles comprises) :

> « La veille est régulière et vise à : - repérer les techniques et
> technologies émergentes du secteur informatique ; - d'utiliser de manière
> approfondie des moyens de recherche d'information ; - de renforcer de ses
> compétences. »

La grille nationale d'évaluation reprend ce texte corrigé (« utiliser… »,
« renforcer ses compétences »).

Pour l'option SISR, le bloc 3 (cybersécurité, épreuve E7) contient un second
critère : « Les failles potentielles sont identifiées grâce à une activité de
veille sur les vulnérabilités. » La collecte des alertes et avis du CERT-FR y
répond aussi.

Aucun texte officiel ne fixe un nombre de synthèses, un format ni un outil.
Le mot qui compte pour l'E5 : **régulière**. Les dix étapes ne sont pas une
exigence du référentiel : c'est une méthode inspirée du cycle de la veille
(ancienne norme expérimentale AFNOR XP X50-053 de 1998, aujourd'hui annulée,
et guides des URFIST) que tu as choisie et que tu dois pouvoir expliquer.

## Qui fait quoi

| Étape | Automatique | À toi |
|---|---|---|
| 1 Cadrer | — | Savoir dire pourquoi ces deux thèmes (projet pro, stage, Soveris) |
| 2 Délimiter | Les règles traduisent le périmètre (imparfaitement) | Savoir expliquer les axes, ce qui est exclu, et rattraper en revue ce que les règles manquent |
| 3 Types d'info | — | Savoir justifier le mélange alertes / presse / éditeurs / outils |
| 4 Sources | Liste publiée + export OPML | Justifier chaque source, en ajouter ou retirer |
| 5 Collecte | GitHub Actions, chaque jour | Savoir expliquer le schéma flux → script → JSON → site |
| 6 Trier | Premier tri par règles | **Revue chaque semaine** (`revue.py`) |
| 7 Analyser | — | Lire en entier, recouper, tester en lab ou sur Soveris |
| 8 Synthétiser | — | **Rédiger toi-même** les synthèses |
| 9 Diffuser | Page publique, flux RSS | Partager sur LinkedIn, remplir la ligne C6 du tableau E5 |
| 10 Réajuster | Indicateurs par thème et par mois | Bilan chaque trimestre |

Sur le site, les étapes 1 à 4 sont marquées « En place » parce que les choix
sont documentés sur la page. L'état des étapes 5 à 10 est **calculé** : tant
qu'aucune revue n'est enregistrée, l'étape 6 affiche « À mener » ; l'étape 10
le reste tant qu'aucun bilan n'est daté ; l'étape 5 passe à « À mener » si la
dernière exécution a échoué ou date de plus de 3 jours.

## La routine hebdomadaire (15 à 30 min)

Le même jour chaque semaine, depuis `C:\portfolio-site` :

```bash
git pull --rebase
python scripts/veille/revue.py
```

Le script affiche les articles arrivés depuis ta dernière revue. Pour chacun :

- `r` : je le retiens (je l'ai lu, il mérite une synthèse) ;
- `l` : lu, sans suite ;
- Entrée : vu (titre seulement) ;
- `q` (ou Ctrl+C) : j'arrête là, les réponses déjà données sont gardées.

Une faute de frappe est refusée et la question reposée. À la fin, une phrase
facultative : ce que tu retiens de la semaine, **avec tes mots**. Puis :

```bash
git add data/veille-revues.json
git commit -m "veille: revue du AAAA-MM-JJ"
git pull --rebase
git push
```

Le `git pull --rebase` avant le push compte : le robot de collecte pousse
presque chaque jour sur `main`.

Le commit à ton nom date la revue : c'est la preuve de régularité. Le site
l'affiche dans « Journal des revues » et dans le flux RSS
(`/veille/rss.xml`). **Ne jamais antidater** : l'historique git le montrerait.

## Les synthèses

Rythme conseillé (aucun chiffre officiel) : une toutes les deux semaines. Cela
donne une dizaine de synthèses réparties dans le temps d'ici le dépôt de mars.

Format d'une synthèse :

1. **Sujet** et date de rédaction.
2. **Sources** : l'article, et une seconde source qui le confirme (avis CERT-FR,
   note de l'éditeur…). Deux sources = étape 7 tenue.
3. **Ce que je retiens** : les faits, reformulés.
4. **Ce que ça change** : pour un support N1, pour un administrateur, pour toi.
5. **Lien** si possible : un lab, Soveris, ton stage, un besoin de formation.

Règles :

- **Tu écris le premier jet.** Une IA peut relire et corriger, pas l'inverse.
  Le jury t'interroge 30 minutes : chaque phrase doit être la tienne.
- **Confidentialité du stage** : tu peux dire ce que tu as fait, jamais comment
  l'infrastructure de la DISI est organisée.

Les deux premières sont préparées dans [syntheses-a-rediger.md](syntheses-a-rediger.md).
Envoie tes réponses : elles seront mises en forme dans `veilleE5.syntheses`
(`lib/experience.ts`), sans changer tes phrases.

## Expliquer le collecteur à l'oral

`scripts/veille/collect.py` lit chaque jour les flux RSS et Atom, garde les
articles qui touchent tes thèmes, et publie le résultat sur le site.

Les règles, en une phrase chacune :

- **IA & support N1** : il faut un mot d'IA **et** un mot de support ou
  d'exploitation (ticket, helpdesk, GLPI, journaux, supervision…). Avant le
  2 novembre, un mot d'IA suffisait : 41 des 80 articles en mémoire étaient
  classés dans ce thème, dont « Claude Code : à quoi sert la commande
  /compact » ; avec la règle actuelle, il en reste 3. Fais toi-même le tri de
  ces 41 titres (pertinent ou non) pour pouvoir défendre le chiffre : un relevé
  fait par Claude en comptait 3 vraiment dans le sujet.
- **« IA », « AI », « Claude »** ne comptent que dans le titre : cités en
  passant dans un article, ils ne font pas un article sur l'IA.
- **Accès & authentification** : MFA, SSH, PKI, certificats, Active Directory,
  Entra, hameçonnage… mais « faille exploitable sans authentification »
  est ignoré : c'est une faille, pas du durcissement des accès. « Phishing »
  cité en passant ne suffit pas : il doit être dans le titre ou accompagné.
- **Outils du support** : GLPI et Request Tracker, utilisés en stage. Chaque
  nouvelle version est gardée, pas les préversions (rc, beta).
- **Alertes CERT-FR** : toutes gardées, même hors thèmes.
- Une correction des règles est **réappliquée aux articles déjà retenus** de
  la fenêtre de 120 jours. Les articles écartés ne sont pas conservés :
  assouplir une règle ne les fait pas revenir.
- Les articles publiés avant qu'une source soit suivie (ses 30 derniers jours,
  repris à l'ajout) sont marqués « repris » et exclus des indicateurs.

Questions probables du jury, et où est la réponse :

- *Pourquoi ces sources ?* → la carte de chaque source dit pourquoi, et depuis quand.
- *Comment évitez-vous le bruit ?* → les règles ci-dessus, et la revue humaine.
- *Le robot lit-il à votre place ?* → non : il repère, tu lis. Journal des revues.
- *Qu'est-ce que la veille vous a apporté ?* → tes synthèses, et ce que tu as
  testé ou appris grâce à elles.

## Ajouter ou retirer une source

Dans `scripts/veille/collect.py`, liste `SOURCES` : une entrée avec `id`,
`name`, `kind`, `type`, `lang`, `url`, `site`, `since` (date d'ajout) et `why`
(pourquoi). À l'ajout, seuls les 30 derniers jours de la source sont repris.

Pour tester avant de pousser, sous PowerShell :

```powershell
python scripts/veille/collect.py
$env:VEILLE_LOCAL='1'; npm run dev
```

Puis remets le fichier de collecte tel qu'il est sur GitHub, pour que la date
affichée reste celle de la collecte automatique :

```bash
git checkout data/veille-feed.json
```

Sources testées et écartées le 2 novembre 2026 (trop de volume ou hors
sujet) : LeMagIT, Le Monde Informatique, ZDNet, Next, 01net, JDN, Clubic,
The Hacker News, BleepingComputer, CIO.com, TechTarget. Reddit : retours
terrain intéressants (r/msp), mais il bloque souvent les collectes
automatiques. Les flux des éditeurs ITSM (ServiceNow, Zendesk, EasyVista,
ManageEngine…) sont absents ou cassés. Retenus pour le thème principal :
ITSM.tools et la communauté Spiceworks (tag IA).

## Le bilan trimestriel (étape 10)

Une fois par trimestre, regarde sur le site :

- le volume par thème : le thème principal est-il assez alimenté ?
- les sources marquées « sans nouvel article depuis N jours » ;
- les faux positifs repérés pendant tes revues : une règle à corriger ?

Note ce que tu changes et pourquoi dans le message de commit. C'est la trace
du réajustement.

## Avant le dépôt de mars

- [ ] Des revues hebdomadaires régulières depuis novembre
- [ ] Des synthèses rédigées par toi, réparties dans le temps
- [ ] La veille reliée à la ligne « Organiser son développement professionnel »
      du tableau de synthèse E5
- [ ] Les articles cités dans les synthèses archivés (capture ou
      web.archive.org) : ils sortent de la collecte après 120 jours
- [ ] Savoir expliquer chaque règle et chaque source
