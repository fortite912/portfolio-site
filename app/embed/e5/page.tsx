import type { Metadata } from "next";
import { CcfSection } from "@/components/ccf-section";

/** Sous-page E5 du Google Site (menu Projets) : administration systemes et reseaux. */
export const metadata: Metadata = {
  title: "E5 — Administration des systèmes et des réseaux — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedE5Page() {
  return <CcfSection standalone />;
}
