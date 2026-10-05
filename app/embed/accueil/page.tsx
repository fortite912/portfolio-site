import type { Metadata } from "next";
import { ParcoursContent } from "@/components/parcours-content";
import { EmbedHero } from "@/components/embed-hero";
import { EmbedIntro } from "@/components/embed-intro";

/**
 * Accueil du Google Site, en integration pleine page.
 * La page defile naturellement, sans boite a barre de defilement
 * interieure : en-tete, presentation puis parcours complet.
 */
export const metadata: Metadata = {
  title: "Sean Fritsch — Portfolio BTS SIO SISR",
  robots: { index: false, follow: false },
};

export default function EmbedAccueilPage() {
  return (
    <div className="space-y-14">
      <div className="space-y-10">
        <EmbedHero />
        <EmbedIntro />
      </div>
      <div className="section-divider" />
      <ParcoursContent />
    </div>
  );
}
