# E5 — l'oral sur portfolio : check-list

Sources : référentiel BTS SIO (arrêté du 8 juillet 2024, JO du 10 juillet 2024), annexe II.D, épreuve E5 ; consignes de l'établissement reçues en octobre 2026.

## Numérotation des épreuves (référentiel en vigueur)

| Code | Épreuve | Forme |
|---|---|---|
| E4 | Culture économique, juridique et managériale pour l'informatique | écrit |
| **E5** | **Support et mise à disposition de services informatiques — l'oral sur portfolio** | oral 40 min, CCF |
| **E6** | **Administration des systèmes et des réseaux** (option SISR) | pratique et orale, CCF |
| E7 | Cybersécurité des services informatiques | écrit |

La veille technologique relève de **E5** (compétence C6, « Organiser son développement professionnel »).
Jusqu'au 8 octobre 2026 le site affichait « E4 — veille » et « E5 — administration SR » : corrigé.

## Le dossier numérique

Contrôle de conformité par l'académie avant l'interrogation.

- [x] **Portfolio en ligne** — https://portfolio-site-ten-pearl-61.vercel.app (le Google Site, réservé au prof, intègre les mêmes pages)
- [ ] **Tableau de synthèse** — modèle officiel fourni par la circulaire nationale (fichier Excel : une ligne par réalisation, période, productions, une croix par compétence mobilisée). Ne pas inventer de modèle : récupérer le fichier auprès du prof.
- [ ] **Attestations de stage signées** — DISI de CentraleSupélec (18 mai — 19 juin 2026) ; Cigref (16 novembre — 18 décembre 2026, après le stage)
- Dépôt sur Cyclades : **fin mars 2027** d'après l'établissement — à confirmer avec la circulaire académique dès sa parution.

## Le jour J

- 10 minutes maximum : présentation du parcours de professionnalisation et justification de l'acquisition des six compétences.
- 30 minutes : échange avec le jury (une personne enseignante SIO + une personne professionnelle). Approfondissement d'une ou plusieurs réalisations.
- Le candidat apporte **son matériel et sa connexion** et en est seul responsable (référentiel, 3.2).
- Pénalités annoncées par l'établissement : portfolio inaccessible **−10**, tableau de synthèse absent **−2**.

## Plan B si la connexion tombe

Le site tourne en local sans réseau (le flux de veille a une copie embarquée dans `data/veille-feed.json`).

```bash
npm run jury
```

puis ouvrir http://localhost:3000. À faire **la veille** : lancer la commande, couper le Wi-Fi, vérifier que `/epreuves`, `/parcours` et `/projects` s'affichent. Garder un partage de connexion mobile en plus.

## Les six compétences — état au 8 octobre 2026

Proposition de rattachement affichée sur `/epreuves` (données dans `lib/experience.ts`, objet `oralE5`). **À valider avec l'équipe pédagogique** : le jury interroge sur chaque ligne.

| Compétence | État | Réalisations recensées |
|---|---|---|
| C1 Gérer le patrimoine informatique | partielle | Masterisation 122 postes (inventaire) ; lab AD/DNS/DHCP |
| C2 Répondre aux incidents et aux demandes | couverte | Request Tracker ; diagnostic VLAN ; Soveris |
| C3 Développer la présence en ligne | **à couvrir** | Ce portfolio (site, mentions légales, référencement) |
| C4 Travailler en mode projet | couverte | Concours d'entrée (122 postes, date fixe) ; Soveris |
| C5 Mettre à disposition un service | couverte | Déploiement MFA ; sensibilisation phishing ; labs SSH / PKI |
| C6 Organiser son développement professionnel | couverte | Veille automatisée ; AZ-900 ; SNEE ; GitHub / LinkedIn |

## Le piège « présence en ligne » (C3)

Aucun stage ne la couvre. La réalisation se construit en formation, avec ce portfolio comme support :

- conception et déploiement du site (Next.js, Vercel) ;
- mentions légales : `/mentions-legales` ;
- référencement : `sitemap.xml`, `robots.txt`, balises Open Graph, image de partage `/api/og` ;
- **à faire** : mesurer la visibilité (Google Search Console ou équivalent) et garder des captures datées.

Le référentiel parle de « l'organisation » : vérifier avec le prof que le site personnel est accepté comme support, ou prévoir une réalisation sur un site d'association ou de l'établissement.

## Règle d'écriture

Fiches de réalisation, tableau de synthèse, présentation : **premier jet écrit par Sean**, relecture et correction ensuite. Chaque phrase du portfolio doit être défendable pendant les 30 minutes d'entretien.
