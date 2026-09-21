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
