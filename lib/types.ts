// lib/types.ts

export type Availability = {
  label: string;      // ex: "Ouvert aux stages"
  dateRange?: string; // ex: "2026 — selon calendrier"
  location?: string;  // ex: "Île-de-France / Remote"
};

export type SiteLinks = {
  github: string;
  linkedin: string;
  cv: string;      // ex: "/cv.pdf"
  email?: string;  // optionnel
};

export type Site = {
  name: string;
  title: string;
  tagline: string;
  location: string;
  availability: Availability;
  links: SiteLinks;

  // utilisé sur la home (ton erreur actuelle vient de là)
  focus: Array<{
    title: string;
    hint: string;
  }>;

  // petits “chips” en haut de hero si tu les utilises
  badges?: string[];
};

export type ProjectStatus = "Done" | "In progress" | "Planned";

export type ProjectTimelineStep = {
  title: string;
  details: string[];
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  cover?: string; // ex: "/media/ad-dns.png"
  status: ProjectStatus;

  // pour ProjectQuickPanel / grouping / affichage
  category?: "Réseau" | "Systèmes" | "Cloud" | "Preuves";

  // si tu veux des stacks / badges techniques
  stack?: string[];

  // optional: PDF livrable
  pdf?: string; // ex: "/projects/ad-dns-dhcp/report.pdf"

  // page /projects/[slug]
  objective: string;
  method: string[];
  validation: string[];
  deliverables: string[];

  timeline?: ProjectTimelineStep[];

  // page /projects/[slug]/report
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

export type ProjectTimelineStep = {
  title: string;
  details?: string[];
  badge?: string; // ✅ optionnel
};
