import type { Metadata } from "next";
import { ParcoursContent } from "@/components/parcours-content";
import { EmbedIntro } from "@/components/embed-intro";

/**
 * Route d'intégration, affichée en iframe dans le Google Site.
 * Même contenu que /parcours, sans décor de site (navigation, pied de
 * page, fonds), précédé de la présentation : celle-ci était un bloc natif
 * de Google Sites qui ne suivait pas le code.
 */
export const metadata: Metadata = {
  title: "Parcours — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedParcoursPage() {
  return (
    <div className="space-y-14">
      <EmbedIntro />
      <div className="section-divider" />
      <ParcoursContent />
    </div>
  );
}
