// lib/certifications.ts
import type { Certification } from "./types";

export const certifications: Certification[] = [
  {
    slug: "az-900",
    title: "AZ-900 — Fundamentals",
    subtitle: "Cloud concepts, core services, sécurité, pricing + preuves",
    status: "Acquis",
    tags: ["Azure", "Fundamentals", "Cloud"],
    cover: "/media/az900.png",
    proofUrl: "https://learn.microsoft.com/fr-fr/users/seanfritschnkatiah-0194/credentials/d4590e5e382dda04",
    description:
      "Certification obtenue — concepts cloud, services Azure, sécurité, pricing. Preuves et labs documentés.",
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
