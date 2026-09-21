import type { Site } from "./types";

export const SITE: Site = {
  name: "Sean Fritsch",
  url: "https://portfolio-site-ten-pearl-61.vercel.app",
  role: "BTS SIO SISR — 2e année",
  title: "Portfolio SISR",
  tagline: "Syst\u00e8mes \u2022 R\u00e9seaux \u2022 Cybers\u00e9curit\u00e9 \u2014 preuves \u00e0 l\u2019appui.",
  location: "\u00cele-de-France",
  availability: {
    label: "Recherche stage",
    dateRange: "16 nov. → 18 déc. 2026",
    location: "Île-de-France",
  },
  links: {
    github: "https://github.com/fortite912",
    linkedin: "https://www.linkedin.com/in/sean-fritsch",
    cv: "/cv.pdf",
    email: "seanfritsch6@gmail.com",
  },
  focus: [
    { title: "Topologies", hint: "sch\u00e9mas + adressage + VLAN/OSPF" },
    { title: "Configs", hint: "CLI/PowerShell + fichiers + versions" },
    { title: "Tests", hint: "proc\u00e9dures + attendu/observ\u00e9" },
    { title: "Captures", hint: "Wireshark + analyse + interpr\u00e9tation" },
    { title: "Livrables", hint: "PDF + checklists + preuves" },
  ],
  badges: ["BTS SIO SISR \u2014 2e ann\u00e9e", "\u00cele-de-France", "Stage nov. — déc. 2026"],
};
