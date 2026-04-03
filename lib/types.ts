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
