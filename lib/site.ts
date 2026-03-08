import type { Site } from "./types";

export const SITE: Site = {
  name: "Sean Fritsch",
  role: "BTS SIO SISR",
  title: "Portfolio SISR",
  tagline: "Systemes \u2022 Reseaux \u2022 Cybersecurite \u2014 preuves a l\u2019appui.",
  location: "\u00cele-de-France",
  availability: {
    label: "Ouvert aux stages",
    dateRange: "2026 \u2014 selon calendrier",
    location: "\u00cele-de-France / Remote",
  },
  links: {
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/",
    cv: "/cv.pdf",
    email: "seanfritsch6@gmail.com",
  },
  focus: [
    { title: "Topologies", hint: "schemas + adressage + VLAN/OSPF" },
    { title: "Configs", hint: "CLI/PowerShell + fichiers + versions" },
    { title: "Tests", hint: "procedures + attendu/observe" },
    { title: "Captures", hint: "Wireshark + analyse + interpretation" },
    { title: "Livrables", hint: "PDF + checklists + preuves" },
  ],
  badges: ["BTS SIO SISR", "\u00cele-de-France", "Ouvert aux stages"],
};
