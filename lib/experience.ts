import type { Ccf, PriorRole, TimelineEntry, Veille, Venture } from "./types";

/**
 * Parcours affiché sur /parcours.
 * Ordre antéchronologique. Les contenus liés au stage restent volontairement
 * généraux : le rapport de stage est confidentiel.
 */
export const timeline: TimelineEntry[] = [
  {
    slug: "stage-nov-dec-2026",
    kind: "Expérience",
    title: "Recherche de stage — 2e année",
    org: "Stage conventionné à pourvoir",
    period: "16 nov. → 18 déc. 2026 · 5 semaines",
    upcoming: true,
    summary:
      "Deuxième période de stage du BTS, en infrastructure, support IT ou cybersécurité. Recherche en cours — elle alimentera les réalisations professionnelles présentées à l'épreuve E5.",
    highlights: [
      "Période recherchée : du 16 novembre au 18 décembre 2026",
      "Objectif : produire des réalisations d'administration systèmes et réseaux documentées",
      "Chaque intervention sera documentée selon la même méthode que les labs du portfolio",
    ],
  },
  {
    slug: "etudiant-entrepreneur-snee",
    kind: "Statut",
    title: "Étudiant-entrepreneur (SNEE)",
    org: "Pépite Paris Ouest Nord",
    orgNote: "Année universitaire 2026 / 2027",
    period: "Depuis septembre 2026",
    current: true,
    summary:
      "Statut national étudiant-entrepreneur obtenu après passage devant le comité d'engagement, pour porter le projet Soveris en parallèle du BTS.",
    highlights: [
      "Passage devant le comité d'engagement du Pépite le 22 juin 2026",
      "Projet porté : Soveris, un agent de tri des demandes de support informatique de niveau 1",
      "Conception, développement et validation du prototype menés en autonomie",
      "Documentation honnête des limites de l'outil, publiée avec le code",
    ],
    stack: ["Python", "Tests automatisés", "Base de connaissances", "Traitement local"],
  },
  {
    slug: "stage-disi-centralesupelec",
    kind: "Expérience",
    title: "Stage BTS SIO — support et infrastructure",
    org: "Direction des Systèmes d'Information (DISI) — CentraleSupélec",
    orgNote: "Campus de Gif-sur-Yvette",
    period: "18 mai — 19 juin 2026 · 5 semaines",
    summary:
      "Stage de première année de BTS SIO option SISR au sein de la DISI : support utilisateur, interventions de proximité et première mission réseau menée en autonomie.",
    highlights: [
      "Support utilisateur sur l'outil de ticketing Request Tracker",
      "Interventions de proximité : imprimantes en environnement PaperCut, stations d'accueil, écrans, batteries, vérification du Wi-Fi en amphithéâtre",
      "Déploiement de la double authentification (MFA) sur les téléphones d'un groupe d'utilisateurs, avec fichier de suivi pour la traçabilité",
      "Diagnostic du réseau filaire et des VLAN — première intervention réseau en autonomie",
      "Sensibilisation des utilisateurs aux risques : hameçonnage, faux support technique",
      "Préparation informatique des concours d'entrée de l'école : masterisation et installation de 122 postes, relevé des numéros de série, inventaire",
    ],
    stack: ["Active Directory", "VLAN", "MFA", "Masterisation", "GLPI", "Request Tracker"],
    note: "Lettre de recommandation remise par le maître de stage. Le rapport de stage étant confidentiel, aucune procédure interne n'est détaillée ici.",
  },
  {
    slug: "bts-sio-sisr",
    kind: "Formation",
    title: "BTS SIO — option SISR",
    org: "Pôle Supérieur Montalembert",
    orgNote: "Courbevoie",
    period: "2e année en cours · 2026 / 2027",
    current: true,
    summary:
      "Solutions d'Infrastructure, Systèmes et Réseaux. Formation complétée par des labs documentés et un parcours de certification Azure.",
    highlights: [
      "Administration Windows Server : AD DS, DNS, DHCP, GPO, PowerShell",
      "Réseau Cisco : VLAN, routage inter-VLAN, STP, EtherChannel, OSPF",
      "Cybersécurité : durcissement SSH, PKI / TLS, analyse de captures réseau",
      "Certification Microsoft Azure Fundamentals (AZ-900) acquise",
    ],
    stack: ["Windows Server", "Cisco IOS", "Wireshark", "Azure", "Linux"],
  },
];

/**
 * Chiffres issus du banc de validation de Soveris.
 * Prototype : aucune donnée réelle d'un employeur ou d'une école n'y est utilisée.
 */
export const soveris: Venture = {
  name: "Soveris",
  tagline: "Agent de tri des demandes de support informatique de niveau 1",
  description:
    "Un prototype qui lit une demande de support, décide si elle peut être résolue automatiquement et propose la réponse correspondante. Tout le traitement se fait en local, en Python et sans dépendance externe : les données ne sortent pas de la machine.",
  metrics: [
    { value: "46/50", label: "décisions correctes sur le banc indépendant" },
    { value: "92%", label: "de précision sur les 50 cas de test" },
    { value: "0", label: "fausse résolution dangereuse" },
    { value: "19/19", label: "tests automatisés au vert" },
    { value: "70%", label: "de résolution automatique sur le jeu de démo" },
    { value: "15", label: "articles dans la base de connaissances" },
  ],
  stack: ["Python", "Traitement 100% local", "Base de connaissances", "Tests automatisés"],
  repo: "https://github.com/fortite912/soveris",
  caveats: [
    "Projet à l'état de prototype : il n'est déployé en production nulle part.",
    "Aucune donnée réelle d'entreprise ou d'établissement n'est utilisée — le banc de test est construit sur des cas fictifs.",
    "Les limites connues de l'outil sont documentées publiquement dans le fichier LIMITES.md du dépôt.",
  ],
};

/**
 * Épreuve E5 du BTS SIO option SISR.
 * Section marquée « À venir » : les réalisations seront produites pendant
 * le stage de novembre — décembre 2026.
 */
export const ccfE5: Ccf = {
  code: "E5",
  title: "Administration des systèmes et des réseaux",
  option: "Option SISR",
  coefficient: 4,
  evaluation: "Contrôle en cours de formation (CCF)",
  status: "À venir",
  intro:
    "L'épreuve E5 évalue le bloc « Administration des systèmes et des réseaux ». Elle s'appuie sur un portfolio de réalisations professionnelles menées en formation et en stage. Cette section sera complétée au fur et à mesure de leur production.",
  competences: [
    {
      title: "Concevoir une solution d'infrastructure réseau",
      detail:
        "Analyser un besoin, choisir une architecture, préparer l'adressage et les schémas avant toute configuration.",
    },
    {
      title: "Installer, tester et déployer une solution d'infrastructure réseau",
      detail:
        "Mettre en œuvre la solution, exécuter un plan de tests et comparer l'attendu à l'observé.",
    },
    {
      title: "Exploiter, dépanner et superviser une solution d'infrastructure réseau",
      detail:
        "Assurer le maintien en condition opérationnelle, diagnostiquer les incidents et documenter les résolutions.",
    },
  ],
  deliverables: [
    {
      label: "Fiches descriptives de réalisations professionnelles",
      detail: "Une fiche par réalisation : contexte, besoin, solution retenue, mise en œuvre.",
    },
    {
      label: "Schémas réseau",
      detail: "Topologie, plan d'adressage, segmentation VLAN.",
    },
    {
      label: "Documentation technique",
      detail: "Configurations, procédures d'installation et paramètres retenus.",
    },
    {
      label: "Rapports de tests",
      detail: "Procédure de validation, résultat attendu, résultat observé.",
    },
    {
      label: "Documentation utilisateur",
      detail: "Mode opératoire destiné aux utilisateurs finaux.",
    },
  ],
  notes: [
    "Les labs déjà publiés dans la section Projets (VLAN, AD/DNS/DHCP, PKI, SSH) constituent la base méthodologique de ces réalisations.",
    "Le stage du 16 novembre au 18 décembre 2026 fournira les situations professionnelles en environnement réel.",
  ],
};

/**
 * Veille technologique — épreuve E4, compétence "Organiser son
 * développement professionnel". Le jury évalue la méthode et l'impact
 * concret, pas un exposé. Pour changer de thème, il suffit d'éditer
 * themePrincipal ci-dessous.
 */
export const veilleE4: Veille = {
  epreuve: "E4",
  competence: "Organiser son développement professionnel",
  status: "En cours",
  themePrincipal: {
    title: "L'intégration de l'IA dans le support informatique de niveau 1",
    why:
      "Thème choisi parce qu'il est directement adossé à un projet mené : Soveris, un prototype de tri automatique des demandes de support. La veille ne reste donc pas théorique — chaque lecture est confrontée à un banc de test réel.",
  },
  themeSecondaire: {
    title: "Durcissement des accès : MFA, SSH et PKI",
    why:
      "Prolonge le déploiement MFA conduit en stage à la DISI et les labs SSH et PKI du portfolio.",
  },
  method: [
    "Réception automatisée : un workflow GitHub Actions lit chaque matin les flux RSS des sources, retient les articles liés aux deux thèmes et les publie sur ce portfolio",
    "Revue hebdomadaire d'environ 30 minutes, le même jour chaque semaine",
    "Pour chaque élément retenu : une fiche courte — source, date, ce que ça change concrètement sur une infrastructure",
    "Les éléments qui concernent un lab du portfolio sont reportés dans le lab correspondant",
  ],
  sources: [
    {
      name: "CERT-FR",
      kind: "Alertes et avis",
      detail: "Alertes de sécurité officielles et bulletins d'actualité du centre gouvernemental de veille.",
      url: "https://www.cert.ssi.gouv.fr/",
    },
    {
      name: "ANSSI",
      kind: "Guides et publications",
      detail:
        "Référentiels et recommandations de durcissement, consultés directement : pas de flux RSS. Ses alertes arrivent via le CERT-FR, qui en dépend.",
      url: "https://cyber.gouv.fr/",
    },
    {
      name: "IT Connect",
      kind: "Blog technique FR",
      detail: "Tutoriels et actualité administration systèmes et réseaux.",
      url: "https://www.it-connect.fr/",
    },
    {
      name: "Zataz",
      kind: "Actualité cybersécurité FR",
      detail: "Suivi des incidents et des fuites de données.",
      url: "https://www.zataz.com/",
    },
  ],
  syntheses: [],
};

/**
 * Expériences antérieures au BTS, présentées en tableau compact :
 * elles montrent une trajectoire, pas des réalisations d'épreuve.
 * Ajouter une ligne suffit à étendre la section.
 */
export const priorRoles: PriorRole[] = [
  {
    period: "11/2024 — 12/2024",
    role: "Service Data RH et marque employeur",
    org: "AXA France",
    place: "Nanterre",
    kind: "Stage PFMP",
    detail:
      "Support sur analyses de données, coordination de la communication, création de contenus digitaux et validation de solutions IA.",
    it: true,
  },
  {
    period: "06/2024",
    role: "Technicien réseau informatique",
    org: "Mairie de Garches",
    place: "Garches",
    kind: "Stage PFMP",
    detail:
      "Dépannage des problèmes de performance du réseau, interventions sur les postes des agents et les infrastructures de la ville.",
    it: true,
  },
  {
    period: "01/2024 — 02/2024",
    role: "Technicien systèmes de surveillance",
    org: "Mediterranean Protection Solutions",
    place: "Pietà, Malte",
    kind: "Stage PFMP",
    detail:
      "Installation, tests et mise en service de caméras, équipements rayons X et contrôle d'accès — hôtels, aéroport, port de La Valette.",
    it: true,
  },
  {
    period: "06/2023",
    role: "Technicien",
    org: "Apilog Automation",
    place: "Massy",
    kind: "Stage PFMP",
    detail: "Réalisation d'une platine automate et programmation.",
    it: true,
  },
  {
    period: "01/2023 — 02/2023",
    role: "Technicien fibre optique SAV",
    org: "FIT Telecom",
    place: "Paris",
    kind: "Stage PFMP",
    detail:
      "Diagnostic de connectivité et résolution de pannes abonnés (SFR, Free, Orange), application des procédures et contrôle qualité.",
    it: true,
  },
  {
    period: "étés 2025 et 2026",
    role: "Surveillant de baignade",
    org: "Ville de Garches",
    place: "Garches",
    kind: "Emploi saisonnier",
    detail: "Responsabilité de sécurité en autonomie — diplômes PSE1 et BNSSA.",
    it: false,
  },
  {
    period: "02/2022",
    role: "Stage d'observation de 3e",
    org: "PwC France-Maghreb",
    place: "Levallois-Perret",
    kind: "Stage",
    detail: "Première découverte d'un environnement professionnel.",
    it: false,
  },
];
