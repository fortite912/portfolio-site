import { veilleE5 } from "@/lib/experience";
import { revues } from "@/lib/veille-method";

export type PlanStatus = "fait" | "en-cours" | "a-venir";

export type Jalon = {
  /** Date ou période, en clair. */
  quand: string;
  /** Date de fin du jalon (AAAA-MM-JJ), pour le situer dans le temps. */
  fin: string;
  titre: string;
  detail: string;
  status: PlanStatus;
  /** Jalon fixé par l'établissement ou l'académie, pas par moi. */
  officiel?: boolean;
};

/** Revues hebdomadaires prévues entre la première (9 novembre) et le dépôt. */
export const REVUES_PREVUES = 20;
/** Résumés prévus d'ici le dépôt, un toutes les deux semaines. */
export const RESUMES_PREVUS = 10;

/**
 * Planning prévisionnel de la veille jusqu'à l'épreuve E5 (mars 2027).
 * Les jalons déjà franchis sont marqués d'après les données (revues,
 * synthèses, bilans publiés), pas cochés à la main. Les dates d'examen
 * sont celles annoncées par l'établissement : à confirmer quand
 * l'académie publie le calendrier de la session 2027.
 */
export function veillePlanning(today = new Date()): Jalon[] {
  const { syntheses, bilans } = veilleE5;
  const iso = today.toISOString().slice(0, 10);
  const passe = (fin: string): PlanStatus => (fin < iso ? "fait" : "a-venir");
  const compte = (n: number, total: number): PlanStatus =>
    n >= total ? "fait" : n > 0 ? "en-cours" : "a-venir";

  return [
    {
      quand: "23 septembre 2026",
      fin: "2026-09-23",
      titre: "Collecte automatique en place",
      detail: "Un programme relève chaque jour les articles de mes premières sources.",
      status: "fait",
    },
    {
      quand: "2 novembre 2026",
      fin: "2026-11-02",
      titre: "Méthode en 10 étapes et nouvelles sources",
      detail: "Sujets précisés, sources complétées, tri plus fiable.",
      status: "fait",
    },
    {
      quand: "Semaine du 9 novembre 2026",
      fin: "2026-11-15",
      titre: "Première revue de la semaine",
      detail: "Je parcours les articles trouvés et je garde les plus importants.",
      status: revues.length > 0 ? "fait" : passe("2026-11-15") === "fait" ? "en-cours" : "a-venir",
    },
    {
      quand: "Avant le 15 novembre 2026",
      fin: "2026-11-15",
      titre: "Mes deux premiers résumés",
      detail: "Les failles de GLPI et le rythme des correctifs ; la double authentification face aux rançongiciels.",
      status: compte(syntheses.length, 2),
    },
    {
      quand: "16 novembre → 18 décembre 2026",
      fin: "2026-12-18",
      titre: "Stage au Cigref : la veille continue",
      detail: "Revue chaque semaine pendant le stage ; ce que j'y apprends peut nourrir un résumé, sans rien de confidentiel.",
      status: passe("2026-12-18") === "fait" ? "fait" : iso >= "2026-11-16" ? "en-cours" : "a-venir",
    },
    {
      quand: "Chaque semaine jusqu'au dépôt",
      fin: "2027-03-26",
      titre: `Une revue par semaine (${revues.length} sur ${REVUES_PREVUES} prévues)`,
      detail: "Une revue datée chaque semaine : c'est la preuve que ma veille est régulière.",
      status: compte(revues.length, REVUES_PREVUES),
    },
    {
      quand: "Toutes les deux semaines",
      fin: "2027-03-12",
      titre: `Un résumé (${syntheses.length} sur ${RESUMES_PREVUS} prévus)`,
      detail: "Un sujet, ses sources, ce que j'en retiens et ce que ça change pour mon travail.",
      status: compte(syntheses.length, RESUMES_PREVUS),
    },
    {
      quand: "Vacances de Noël (19 déc. 2026 → 3 janv. 2027)",
      fin: "2027-01-03",
      titre: "Premier bilan",
      detail: "Après le stage : ce qui marche, les sources à changer, les mots-clés à corriger.",
      status: bilans.length >= 1 ? "fait" : "a-venir",
    },
    {
      quand: "Fin janvier 2027 (attendu)",
      fin: "2027-01-31",
      titre: "Calendrier officiel de la session 2027",
      detail: "L'académie publie les dates exactes de dépôt et d'épreuves : je mets ce planning à jour.",
      status: passe("2027-01-31"),
      officiel: true,
    },
    {
      quand: "Vacances d'hiver (6 → 21 février 2027)",
      fin: "2027-02-21",
      titre: "Deuxième bilan et préparation du dossier",
      detail:
        "Archiver les articles cités, remplir la ligne « Organiser son développement professionnel » du tableau de synthèse.",
      status: bilans.length >= 2 ? "fait" : "a-venir",
    },
    {
      quand: "Fin mars 2027",
      fin: "2027-03-31",
      titre: "Dépôt du dossier E5 sur Cyclades",
      detail: "Date exacte fixée par l'académie.",
      status: passe("2027-03-31"),
      officiel: true,
    },
    {
      quand: "Mars 2027",
      fin: "2027-03-31",
      titre: "Épreuve E5",
      detail: "Date exacte fixée par l'établissement. La veille est présentée pendant l'oral.",
      status: passe("2027-03-31"),
      officiel: true,
    },
  ];
}
