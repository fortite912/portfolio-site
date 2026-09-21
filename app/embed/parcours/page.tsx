import type { Metadata } from "next";
import { ParcoursContent } from "@/components/parcours-content";

/**
 * Route d'integration, destinee a etre affichee en iframe (Google Sites).
 * Meme contenu que /parcours, mais sans le decor de site : ni barre de
 * navigation, ni pied de page, ni animations. Le rendu est entierement
 * fait cote serveur, ce qui garde l'editeur Google Sites fluide.
 */
export const metadata: Metadata = {
  title: "Parcours — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedParcoursPage() {
  return <ParcoursContent />;
}
