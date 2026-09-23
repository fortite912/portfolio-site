import fallback from "@/data/veille-feed.json";

export type VeilleTheme = "ia-support" | "acces" | "alerte";

export type VeilleItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  kind: string;
  date: string;
  themes: VeilleTheme[];
  excerpt: string;
};

export type VeilleFeed = {
  collectedAt: string;
  windowDays: number;
  sources: Array<{ name: string; kind: string; url: string; ok: boolean; retained?: number }>;
  items: VeilleItem[];
};

export const THEME_LABELS: Record<VeilleTheme, string> = {
  "ia-support": "IA & support N1",
  acces: "Accès & authentification",
  alerte: "Alerte CERT-FR",
};

/** Fichier ecrit chaque matin par .github/workflows/veille.yml. */
const FEED_URL =
  "https://raw.githubusercontent.com/fortite912/portfolio-site/main/data/veille-feed.json";

export const WORKFLOW_URL =
  "https://github.com/fortite912/portfolio-site/actions/workflows/veille.yml";

/**
 * Lit la derniere collecte publiee par le workflow.
 * Revalidee toutes les heures : la veille se met a jour sur le site sans
 * redeploiement. Si GitHub est injoignable, on sert la copie embarquee au
 * build — la page ne casse jamais a cause de la veille.
 */
export async function getVeilleFeed(): Promise<VeilleFeed> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as VeilleFeed;
  } catch {
    return fallback as VeilleFeed;
  }
}
