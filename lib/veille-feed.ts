import fallback from "@/data/veille-feed.json";

export type VeilleTheme = "ia-support" | "acces" | "outils" | "alerte";

export type VeilleItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  sourceId?: string;
  kind: string;
  date: string;
  themes: VeilleTheme[];
  excerpt: string;
  /** Repris à l'ajout de la source (publié avant sa date de suivi). */
  backfill?: boolean;
};

export type VeilleSourceStatus = {
  id?: string;
  name: string;
  kind: string;
  type?: string;
  lang?: string;
  url: string;
  site?: string;
  since?: string;
  why?: string;
  always?: string[];
  ok: boolean;
  error?: string;
  /** Date du plus récent article publié par le flux, retenu ou non. */
  lastItem?: string | null;
  retained?: number;
};

export type VeilleManualSource = {
  name: string;
  kind: string;
  site: string;
  why: string;
  since?: string;
};

export type VeilleRule = {
  label: string;
  rule: string;
  patterns: Record<string, string[]>;
};

export type VeilleFeed = {
  /** Date de la dernière réécriture du fichier (article, source, règle). */
  collectedAt: string;
  /** Date du dernier article nouveau. */
  lastAddedAt?: string;
  windowDays: number;
  sources: VeilleSourceStatus[];
  manualSources?: VeilleManualSource[];
  rules?: Partial<Record<VeilleTheme, VeilleRule>>;
  items: VeilleItem[];
};

export const THEME_LABELS: Record<VeilleTheme, string> = {
  "ia-support": "IA & support N1",
  acces: "Accès & authentification",
  outils: "Outils du support",
  alerte: "Alerte CERT-FR",
};

const REPO = "fortite912/portfolio-site";

/** Fichier écrit par .github/workflows/veille.yml à chaque changement. */
const FEED_URL = `https://raw.githubusercontent.com/${REPO}/main/data/veille-feed.json`;

export const WORKFLOW_URL = `https://github.com/${REPO}/actions/workflows/veille.yml`;
export const COLLECTOR_URL = `https://github.com/${REPO}/blob/main/scripts/veille/collect.py`;
export const COLLECTOR_HISTORY_URL = `https://github.com/${REPO}/commits/main/scripts/veille/collect.py`;

/**
 * Lit la dernière collecte publiée par le workflow.
 * Revalidée toutes les heures : la veille se met à jour sur le site sans
 * redéploiement. Si GitHub est injoignable, on sert la copie embarquée au
 * build — la page ne casse jamais à cause de la veille.
 */
export async function getVeilleFeed(): Promise<VeilleFeed> {
  // VEILLE_LOCAL=1 : relire le fichier local, pour tester une collecte
  // ou des regles avant de les pousser.
  if (process.env.VEILLE_LOCAL === "1") return fallback as VeilleFeed;
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as VeilleFeed;
  } catch {
    return fallback as VeilleFeed;
  }
}

export type LastRun = { at: string; ok: boolean };

/**
 * Dernière exécution terminée du workflow, réussie ou non, lue dans l'API
 * publique de GitHub. Distincte de collectedAt : les jours sans nouveauté,
 * la collecte tourne mais le fichier ne change pas. null si l'API ne
 * répond pas (quota de 60 requêtes par heure, panne) : l'affichage s'en
 * passe alors.
 */
export async function getLastRun(): Promise<LastRun | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/actions/workflows/veille.yml/runs?status=completed&per_page=1`,
      { next: { revalidate: 3600 }, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      workflow_runs?: Array<{ run_started_at?: string; conclusion?: string | null }>;
    };
    const run = data.workflow_runs?.[0];
    return run?.run_started_at ? { at: run.run_started_at, ok: run.conclusion === "success" } : null;
  } catch {
    return null;
  }
}

/** Nombre de jours écoulés depuis une date ISO, à la date de rendu. */
export function daysSince(iso: string, now = new Date()): number {
  return Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000);
}
