// lib/site.ts
import type { Site } from "./types";

export const SITE: Site = {
  name: "Sean Fritsch",
  title: "Portfolio SISR",
  tagline: "Systèmes • Réseaux • Cybersécurité — preuves à l’appui.",
  location: "Île-de-France",
  availability: {
    label: "Ouvert aux stages",
    dateRange: "2026 — selon calendrier",
    location: "Île-de-France / Remote",
  },
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    cv: "/cv.pdf",
    email: "seanfritsch6@gmail.com",
  },
  focus: [
    { title: "Topologies", hint: "schémas + adressage + VLAN/OSPF" },
    { title: "Configs", hint: "CLI/PowerShell + fichiers + versions" },
    { title: "Tests", hint: "procédures + attendu/observé" },
    { title: "Captures", hint: "Wireshark + analyse + interprétation" },
    { title: "Livrables", hint: "PDF + checklists + preuves" },
  ],
  badges: ["BTS SIO SISR", "Île-de-France", "Ouvert aux stages"],
};
