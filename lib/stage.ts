/**
 * Stage de 2e année — source unique de vérité.
 *
 * Le statut du stage apparaissait en dur dans cinq fichiers (badge
 * d'accueil, appel à l'action, contact, modèle d'e-mail, parcours).
 * Tout lit désormais cet objet : faire évoluer le statut revient à
 * modifier ce seul fichier.
 *
 * Trois états :
 * - "recherche" : aucune structure, on cherche ;
 * - "accepte"   : structure trouvée, convention en cours de signature —
 *                 formulation prudente ;
 * - "signe"     : convention signée.
 */
export type StageStatus = "recherche" | "accepte" | "signe";

type Stage = {
  status: StageStatus;
  /** Structure d'accueil. Obligatoire hors "recherche". */
  org: string | null;
  /** Tournure « chez / au / à la » propre à la structure : « au Cigref ». */
  orgAt: string | null;
  periodShort: string;
  periodLong: string;
  duration: string;
  domains: string;
};

export const STAGE: Stage = {
  // À la signature de la convention : passer à "signe".
  status: "accepte",
  org: "Cigref",
  orgAt: "au Cigref",
  periodShort: "16 nov. → 18 déc. 2026",
  periodLong: "du 16 novembre au 18 décembre 2026",
  duration: "5 semaines",
  domains: "infrastructure, support IT ou cybersécurité",
};

/**
 * Garde-fou : une structure n'est affichée que si elle est renseignée.
 * On ne publie jamais un stage trouvé sans nom d'employeur.
 */
export function stageHasHost(): boolean {
  return STAGE.status !== "recherche" && Boolean(STAGE.org);
}

function at(): string {
  return STAGE.orgAt ?? `chez ${STAGE.org}`;
}

/** Tant que la convention n'est pas signée, on le dit. */
function pendingNote(): string {
  return STAGE.status === "accepte" ? " — convention en cours de signature" : "";
}

/** Phrase de statut à la première personne (accueil, contact, e-mail). */
export function stageSentence(): string {
  return stageHasHost()
    ? `J'effectuerai mon stage de 2e année ${STAGE.periodLong} ${at()}${pendingNote()}.`
    : `Je recherche un stage conventionné ${STAGE.periodLong}, en ${STAGE.domains}.`;
}

/** Formulation impersonnelle, pour les métadonnées de page. */
export function stageMeta(): string {
  return stageHasHost()
    ? `Stage de 2e année prévu ${STAGE.periodLong} ${at()}.`
    : `Recherche un stage conventionné ${STAGE.periodLong} en ${STAGE.domains}.`;
}

/** Badge de disponibilité de l'accueil. */
export function stageBadge(): { label: string; dateRange: string } {
  const label = !stageHasHost()
    ? "Recherche stage"
    : STAGE.status === "accepte"
      ? `Stage prévu ${at()}`
      : `Stage ${at()}`;
  return { label, dateRange: STAGE.periodShort };
}

/** Précision affichée sous le nom de la structure dans le parcours. */
export function stageOrgNote(): string | undefined {
  return STAGE.status === "accepte" ? "Convention en cours de signature" : undefined;
}
