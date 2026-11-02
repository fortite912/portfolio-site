import revuesData from "@/data/veille-revues.json";
import { veilleE5 } from "@/lib/experience";
import type { VeilleRevue } from "@/lib/types";
import { daysSince, type LastRun, type VeilleFeed } from "@/lib/veille-feed";

export const revues = revuesData as VeilleRevue[];

export type StepStatus = "fait" | "automatique" | "a-faire";
export type StepGroup = "preparation" | "semaine" | "trimestre";

export type Step = { n: number; title: string; body: string; status: StepStatus; group: StepGroup };

export const GROUP_LABELS: Record<StepGroup, string> = {
  preparation: "Mise en place",
  semaine: "Mon travail chaque semaine",
  trimestre: "Tous les trois mois",
};

/** Au-delà, la collecte quotidienne est considérée comme arrêtée. */
const RUN_STALE_DAYS = 3;

/** Nombre de sources distinctes (le CERT-FR a deux flux, compté une fois). */
export function sourceCount(feed: VeilleFeed): number {
  const names = new Set([
    ...feed.sources.map((s) => s.name),
    ...(feed.manualSources ?? []).map((s) => s.name),
  ]);
  return names.size;
}

/**
 * La veille en 10 étapes, en mots simples, regroupées en trois temps.
 *
 * Méthode inspirée du cycle de la veille (ancienne norme expérimentale
 * AFNOR XP X50-053, guides des URFIST) : le référentiel n'impose ni
 * nombre d'étapes ni outil, il demande une veille « régulière ».
 *
 * Les étapes 1 à 4 sont des choix décrits sur la page. L'état des étapes
 * 5 à 10 vient des données : dernière exécution de la collecte, revues,
 * synthèses, bilans. Rien n'est coché à la main.
 */
export function veilleSteps(feed: VeilleFeed, lastRun: LastRun | null): Step[] {
  const { syntheses, bilans } = veilleE5;
  const recoupees = syntheses.some((s) => s.sources.length >= 2);
  const collecteOk = !(lastRun && (!lastRun.ok || daysSince(lastRun.at) > RUN_STALE_DAYS));

  return [
    { n: 1, group: "preparation", title: "Choisir mes sujets", body: "Deux sujets liés à mon stage et à mon projet.", status: "fait" },
    { n: 2, group: "preparation", title: "Délimiter", body: "Ce que j'inclus et ce que je laisse de côté.", status: "fait" },
    {
      n: 3,
      group: "preparation",
      title: "Choisir le type d'informations",
      body: "Alertes de sécurité, articles techniques, nouveautés des logiciels.",
      status: "fait",
    },
    {
      n: 4,
      group: "preparation",
      title: "Choisir mes sources",
      body: `${sourceCount(feed)} sources, chacune avec la raison de mon choix.`,
      status: "fait",
    },
    {
      n: 5,
      group: "preparation",
      title: "Collecter automatiquement",
      body: "Un programme lit mes sources chaque jour et garde les articles qui contiennent les mots-clés de mes sujets.",
      status: collecteOk ? "automatique" : "a-faire",
    },
    {
      n: 6,
      group: "semaine",
      title: "Trier",
      body: "Je parcours les articles trouvés et je garde les plus importants.",
      status: revues.length > 0 ? "fait" : "a-faire",
    },
    {
      n: 7,
      group: "semaine",
      title: "Vérifier",
      body: "Je lis l'article en entier et je le compare avec une deuxième source.",
      status: recoupees ? "fait" : "a-faire",
    },
    {
      n: 8,
      group: "semaine",
      title: "Résumer",
      body: "J'écris ce que j'en retiens et ce que ça change pour mon travail.",
      status: syntheses.length > 0 ? "fait" : "a-faire",
    },
    {
      n: 9,
      group: "semaine",
      title: "Partager",
      body: "Je publie mes résumés ici et sur LinkedIn.",
      status: syntheses.length > 0 ? "fait" : "a-faire",
    },
    {
      n: 10,
      group: "trimestre",
      title: "Faire le point",
      body: "Ce qui marche, les sources à changer, les mots-clés à corriger.",
      status: bilans.length > 0 ? "fait" : "a-faire",
    },
  ];
}
