import revuesData from "@/data/veille-revues.json";
import { veilleE5 } from "@/lib/experience";
import type { VeilleRevue } from "@/lib/types";
import {
  COLLECTOR_HISTORY_URL,
  COLLECTOR_URL,
  WORKFLOW_URL,
  daysSince,
  type LastRun,
  type VeilleFeed,
} from "@/lib/veille-feed";

export const revues = revuesData as VeilleRevue[];

export type StepStatus = "en-place" | "automatique" | "en-cours" | "a-mener";

export type Step = {
  n: number;
  title: string;
  body: string;
  status: StepStatus;
  /** Ce qui reste à faire, quand l'étape n'est pas encore tenue. */
  next?: string;
  proofs: Array<{ label: string; href: string }>;
};

/** Au-delà, la collecte quotidienne est considérée comme arrêtée. */
const RUN_STALE_DAYS = 3;

/**
 * La veille en 10 étapes.
 *
 * Méthode inspirée du cycle de la veille (ancienne norme expérimentale
 * AFNOR XP X50-053, guides des URFIST) : le référentiel n'impose ni
 * nombre d'étapes ni outil, il demande une veille « régulière ».
 *
 * Les étapes 1 à 4 sont des choix documentés sur la page : leur état
 * « En place » renvoie à ce qui est affiché. Les étapes 5 à 10 tirent leur
 * état des données : dernière exécution du workflow, revues, synthèses,
 * bilans.
 */
export function veilleSteps(feed: VeilleFeed, lastRun: LastRun | null): Step[] {
  const flux = feed.sources.length;
  const manuelles = feed.manualSources?.length ?? 0;
  const { syntheses, bilans } = veilleE5;
  const recoupees = syntheses.filter((s) => s.sources.length >= 2).length;
  const runKo = lastRun !== null && (!lastRun.ok || daysSince(lastRun.at) > RUN_STALE_DAYS);
  const publie = syntheses.length > 0 || revues.length > 0;

  return [
    {
      n: 1,
      title: "Cadrer",
      body:
        "Pourquoi cette veille : mon projet professionnel en support et infrastructure, et des besoins repérés en stage — GLPI, MFA, place de l'IA dans le support avec Soveris.",
      status: "en-place",
      proofs: [
        { label: "Thèmes", href: "#veille-themes" },
        { label: "Soveris", href: "/parcours#soveris" },
      ],
    },
    {
      n: 2,
      title: "Délimiter",
      body:
        "Chaque thème a ses axes et ce qui en est exclu, traduits en règles de tri explicables, en français et en anglais. Les mots-clés ne voient pas tout : la revue humaine rattrape ce qu'ils manquent.",
      status: "en-place",
      proofs: [
        { label: "Axes", href: "#veille-themes" },
        { label: "Règles de tri", href: "#veille-regles" },
      ],
    },
    {
      n: 3,
      title: "Choisir les types d'information",
      body:
        "Alertes officielles, articles techniques, blogs d'éditeurs, nouvelles versions des outils utilisés en stage (GLPI, Request Tracker), cadre légal.",
      status: "en-place",
      proofs: [{ label: "Sources par type", href: "#veille-sources" }],
    },
    {
      n: 4,
      title: "Sélectionner les sources",
      body: `${flux} flux RSS et Atom, ${manuelles} sources lues à la main. Chaque source est datée et justifiée ; la liste s'importe dans un lecteur de flux.`,
      status: "en-place",
      proofs: [
        { label: "Sources", href: "#veille-sources" },
        { label: "Export OPML", href: "/veille/sources.opml" },
      ],
    },
    {
      n: 5,
      title: "Automatiser la collecte",
      body:
        "Chaque jour, GitHub Actions lit les flux, applique les règles et publie ici les articles retenus. Une source en panne apparaît en échec.",
      status: runKo ? "a-mener" : "automatique",
      next: runKo ? "Rétablir la collecte : dernière exécution en échec ou trop ancienne" : undefined,
      proofs: [
        { label: "Exécutions", href: WORKFLOW_URL },
        { label: "Collecteur", href: COLLECTOR_URL },
      ],
    },
    {
      n: 6,
      title: "Trier",
      body:
        "Premier tri par des règles explicables, puis une revue chaque semaine : je passe les titres en revue et je retiens ce qui mérite d'être approfondi.",
      status: revues.length > 0 ? "en-cours" : "a-mener",
      next: revues.length > 0 ? undefined : "Première revue hebdomadaire",
      proofs: [
        { label: "Règles", href: "#veille-regles" },
        { label: "Journal des revues", href: "#veille-revues" },
      ],
    },
    {
      n: 7,
      title: "Analyser et vérifier",
      body:
        "Lire l'article en entier, recouper avec une seconde source (CERT-FR, éditeur), tester en lab ou sur Soveris quand c'est possible.",
      status: recoupees > 0 ? "en-cours" : "a-mener",
      next: recoupees > 0 ? undefined : "Une première synthèse recoupée par deux sources",
      proofs: [
        { label: "Labs", href: "/projects" },
        { label: "Soveris", href: "/parcours#soveris" },
      ],
    },
    {
      n: 8,
      title: "Synthétiser",
      body:
        "Une synthèse datée, rédigée par moi : les faits et leurs sources, ce que je retiens, ce que ça change pour un support N1 ou un administrateur.",
      status: syntheses.length > 0 ? "en-cours" : "a-mener",
      next: syntheses.length > 0 ? undefined : "Rédiger les deux premières synthèses",
      proofs: [{ label: "Synthèses", href: "#veille-syntheses" }],
    },
    {
      n: 9,
      title: "Diffuser et capitaliser",
      body:
        "Page publique, flux RSS de mes revues et synthèses, partage sur LinkedIn ; chaque synthèse rejoint la ligne « Organiser son développement professionnel » du tableau E5.",
      status: publie ? "en-cours" : "a-mener",
      next: publie ? undefined : "Le flux se remplit avec les premières revues",
      proofs: [{ label: "Flux RSS", href: "/veille/rss.xml" }],
    },
    {
      n: 10,
      title: "Évaluer et réajuster",
      body:
        "Un bilan daté chaque trimestre : volumes par thème, sources muettes, règles à corriger. Les changements de sources et de règles sont datés dans l'historique du dépôt.",
      status: bilans.length > 0 ? "en-cours" : "a-mener",
      next: bilans.length > 0 ? undefined : "Premier bilan trimestriel",
      proofs: [
        { label: "Indicateurs", href: "#veille-collecte" },
        { label: "Historique des règles", href: COLLECTOR_HISTORY_URL },
      ],
    },
  ];
}
