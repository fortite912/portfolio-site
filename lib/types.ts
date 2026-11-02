export type Availability = {
  label: string;
  dateRange?: string;
  location?: string;
};

export type SiteLinks = {
  github: string;
  linkedin: string;
  cv: string;
  email?: string;
};

export type Site = {
  name: string;
  /** URL canonique de production (sans slash final). */
  url: string;
  role: string;
  title: string;
  tagline: string;
  location: string;
  availability: Availability;
  links: SiteLinks;
  focus: Array<{ title: string; hint: string }>;
  badges?: string[];
};

export type ProjectStatus = "Done" | "In progress" | "Planned";

export type ProjectTimelineStep = {
  title: string;
  details?: string[];
  badge?: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  cover?: string;
  status: ProjectStatus;
  category?: "Réseau" | "Systèmes" | "Cloud" | "Preuves" | "Cybersécurité";
  stack?: string[];
  pdf?: string;
  objective: string;
  method: string[];
  validation: string[];
  deliverables: string[];
  proof?: string[];
  timeline?: ProjectTimelineStep[];
  reportTitle?: string;
  reportPdf?: string;
};

export type CertificationStatus = "Acquis" | "En cours" | "À venir";

export type Certification = {
  slug: string;
  title: string;
  status: CertificationStatus;
  subtitle: string;
  description: string;
  tags: string[];
  cover?: string;
  proofUrl?: string;
};

export type TimelineKind = "Expérience" | "Statut" | "Formation";

export type TimelineEntry = {
  slug: string;
  kind: TimelineKind;
  title: string;
  org: string;
  orgNote?: string;
  period: string;
  current?: boolean;
  /** Entrée planifiée, pas encore commencée. */
  upcoming?: boolean;
  summary: string;
  highlights: string[];
  stack?: string[];
  note?: string;
};

export type Venture = {
  name: string;
  tagline: string;
  description: string;
  metrics: Array<{ value: string; label: string }>;
  stack: string[];
  repo?: string;
  caveats: string[];
};

export type CcfDeliverable = {
  label: string;
  detail: string;
  done?: boolean;
};

export type Ccf = {
  code: string;
  title: string;
  option: string;
  coefficient: number;
  evaluation: string;
  status: "À venir" | "En cours" | "Prêt";
  intro: string;
  competences: Array<{ title: string; detail: string }>;
  deliverables: CcfDeliverable[];
  notes: string[];
};

export type RealisationContext = "Stage" | "Formation" | "Entrepreneuriat";

/** Réalisation professionnelle rattachée à une compétence du bloc 1. */
export type Realisation = {
  label: string;
  context: RealisationContext;
  /** Lien interne (lab, section de page) ou externe. */
  href?: string;
};

/** État de couverture d'une compétence par les réalisations recensées. */
export type Coverage = "couverte" | "partielle" | "a-couvrir";

export type OralCompetence = {
  /** C1 … C6, dans l'ordre du référentiel. */
  code: string;
  title: string;
  /** Sous-compétences du référentiel, abrégées. */
  detail: string;
  coverage: Coverage;
  realisations: Realisation[];
  note?: string;
};

export type OralPhase = { duration: string; label: string; detail: string };

/** Épreuve E5 : oral sur portfolio (bloc 1). */
export type Oral = {
  code: string;
  title: string;
  coefficient: number;
  evaluation: string;
  status: "À venir" | "En cours" | "Prêt";
  intro: string;
  phases: OralPhase[];
  jury: string;
  competences: OralCompetence[];
  dossier: CcfDeliverable[];
  notes: string[];
};

export type VeilleThemeSpec = {
  title: string;
  /** Le sujet en une phrase, sans sigle. */
  plain: string;
  why: string;
  /** Axes suivis : le périmètre du thème (étape 2 de la méthode). */
  axes: string[];
  exclu?: string;
};

/**
 * Synthèse de veille, rédigée par moi : faits sourcés, ce que je retiens,
 * ce que cela change. Jamais générée automatiquement.
 */
export type VeilleSynthese = {
  /** AAAA-MM-JJ, date de rédaction. */
  date: string;
  sujet: string;
  sources: Array<{ titre: string; url: string; media: string; date?: string }>;
  retenu: string;
  impact: string;
  lien?: { label: string; href: string };
};

/** Entrée écrite par scripts/veille/revue.py après chaque revue. */
export type VeilleRevue = {
  date: string;
  vus: number;
  lus: number;
  retenus: Array<{ id: string; title: string; link: string; source: string; date: string }>;
  ids?: string[];
  note?: string;
};

/** Bilan périodique de la veille (étape 10), rédigé par moi. */
export type VeilleBilan = {
  /** AAAA-MM-JJ */
  date: string;
  constat: string;
  changements: string;
};

export type Veille = {
  epreuve: string;
  competence: string;
  status: "À venir" | "En cours" | "Prêt";
  themePrincipal: VeilleThemeSpec;
  themeSecondaire: VeilleThemeSpec;
  syntheses: VeilleSynthese[];
  bilans: VeilleBilan[];
};

export type PriorRole = {
  period: string;
  role: string;
  org: string;
  place: string;
  kind: "Stage PFMP" | "Stage" | "Emploi saisonnier";
  detail: string;
  it: boolean;
};
