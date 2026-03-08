import type { Site } from "./types";

export const SITE: Site = {
  name: "Sean Fritsch",
  role: "BTS SIO SISR",
  title: "Portfolio SISR",
  tagline: "Syst\u00e8mes \u2022 R\u00e9seaux \u2022 Cybers\u00e9curit\u00e9 \u2014 preuves \u00e0 l\u2019appui.",
  location: "\u00cele-de-France",
  availability: {
    label: "Ouvert aux stages",
    dateRange: "18 mai \u2014 19 juin 2026",
    location: "\u00cele-de-France / Remote",
  },
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
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
  badges: ["BTS SIO SISR", "\u00cele-de-France", "Ouvert aux stages"],
};
