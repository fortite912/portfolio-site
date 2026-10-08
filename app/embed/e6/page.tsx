import type { Metadata } from "next";
import { CcfSection } from "@/components/ccf-section";

/** Sous-page E6 du Google Site (menu Projets) : administration systemes et reseaux. */
export const metadata: Metadata = {
  title: "E6 — Administration des systèmes et des réseaux — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedE6Page() {
  return <CcfSection />;
}
