import type { Metadata } from "next";
import { ParcoursContent } from "@/components/parcours-content";

export const metadata: Metadata = {
  title: "Parcours — Sean Fritsch",
  description:
    "Stage à la DISI de CentraleSupélec, stage au Cigref, statut étudiant-entrepreneur avec le projet Soveris. Parcours de professionnalisation, BTS SIO SISR 2e année.",
};

export default function ParcoursPage() {
  return <ParcoursContent />;
}
