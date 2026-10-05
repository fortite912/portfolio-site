/**
 * Stage de 2e année — source unique de vérité.
 *
 * Le statut du stage apparaissait en dur dans cinq fichiers (badge
 * d'accueil, appel à l'action, contact, modèle d'e-mail, parcours).
 * Tout lit désormais cet objet : passer de la recherche au stage
 * confirmé revient à modifier ce seul fichier.
 */
export type StageStatus = "recherche" | "confirme";

type Stage = {
  status: StageStatus;
  /** Structure d'accueil. Obligatoire pour afficher le statut confirmé. */
  org: string | null;
  /** Précision facultative : service, ville. */
  orgNote: string | null;
  periodShort: string;
  periodLong: string;
  duration: string;
  domains: string;
};

export const STAGE: Stage = {
  status: "recherche",
  org: null,
  orgNote: null,
  periodShort: "16 nov. → 18 déc. 2026",
  periodLong: "du 16 novembre au 18 décembre 2026",
  duration: "5 semaines",
  domains: "infrastructure, support IT ou cybersécurité",
};

/**
 * Garde-fou : un stage n'est affiché comme confirmé que si la structure
 * d'accueil est renseignée. On ne publie jamais « stage confirmé » sans
 * employeur.
 */
export function stageConfirmed(): boolean {
  return STAGE.status === "confirme" && Boolean(STAGE.org);
}

/** Phrase de statut à la première personne (accueil, contact, e-mail). */
export function stageSentence(): string {
  return stageConfirmed()
    ? `J'effectue mon stage de 2e année ${STAGE.periodLong} chez ${STAGE.org}.`
    : `Je recherche un stage conventionné ${STAGE.periodLong}, en ${STAGE.domains}.`;
}

/** Formulation impersonnelle, pour les métadonnées de page. */
export function stageMeta(): string {
  return stageConfirmed()
    ? `Stage de 2e année ${STAGE.periodLong} chez ${STAGE.org}.`
    : `Recherche un stage conventionné ${STAGE.periodLong} en ${STAGE.domains}.`;
}

/** Badge de disponibilité de l'accueil. */
export function stageBadge(): { label: string; dateRange: string } {
  return {
    label: stageConfirmed() ? `Stage chez ${STAGE.org}` : "Recherche stage",
    dateRange: STAGE.periodShort,
  };
}
