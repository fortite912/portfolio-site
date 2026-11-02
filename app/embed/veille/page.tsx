import type { Metadata } from "next";
import { VeilleSection } from "@/components/veille-section";

/**
 * Page « Veille technologique » du Google Site : le choix des sujets et
 * sa justification, la méthode en 10 étapes, le planning jusqu'à
 * l'épreuve, puis la veille elle-même.
 */
export const metadata: Metadata = {
  title: "Ma veille technologique — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedVeillePage() {
  return <VeilleSection />;
}
