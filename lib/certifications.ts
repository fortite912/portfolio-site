// lib/certifications.ts
import type { Certification } from "./types";

export const certifications: Certification[] = [
  {
    slug: "az-900",
    title: "AZ-900 — Fundamentals",
    subtitle: "Cloud concepts, core services, sécurité, pricing + preuves",
    status: "À venir",
    tags: ["Azure", "Fundamentals", "Cloud"],
    cover: "/media/az900.png",
    description:
      "Plan : cours + labs documentés, captures et checklists. Objectif : validation reproductible (notes + preuves).",
  },
  {
    slug: "az-104",
    title: "AZ-104 — Administrator (labs)",
    subtitle: "Réseau, compute, storage, IAM, monitoring (VM/VNet/NSG)",
    status: "À venir",
    tags: ["Azure", "Admin", "VNet", "NSG"],
    cover: "/media/az104.png",
    description:
      "Approche pratique : labs guidés + scénarios. Livrables : captures, tests de connectivité, procédures.",
  },
];
