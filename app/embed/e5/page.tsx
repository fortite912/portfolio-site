import type { Metadata } from "next";
import { OralSection } from "@/components/oral-section";
import { VeilleSection } from "@/components/veille-section";

/**
 * Sous-page E5 du Google Site (menu Projets) : l'oral sur portfolio,
 * avec la veille technologique qui en fait partie (compétence C6).
 */
export const metadata: Metadata = {
  title: "E5 — Support et mise à disposition de services informatiques — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedE5Page() {
  return (
    <div className="space-y-14">
      <OralSection />
      <div className="section-divider" />
      <VeilleSection />
    </div>
  );
}
