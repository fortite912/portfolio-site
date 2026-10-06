import type { Metadata } from "next";
import { VeilleSection } from "@/components/veille-section";

/** Sous-page E4 du Google Site (menu Projets) : veille technologique. */
export const metadata: Metadata = {
  title: "E4 — Veille technologique — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedE4Page() {
  return <VeilleSection standalone />;
}
