export const SITE = {
  name: "Sean Fritsch",
  short: "SISR",
  role: "BTS SIO SISR",
  url: "http://localhost:3000", // plus tard: ton vrai domaine
  description:
    "Portfolio BTS SIO SISR — Systèmes, Réseaux, Cybersécurité. Labs réalistes, documentation propre, validation et dépannage.",
  tags: ["VMware", "Windows Server", "Debian", "Cisco", "Wireshark"],

  contact: {
    email: "email@bientot.fr", // TODO: mets ton vrai email
    linkedin: "https://linkedin.com", // TODO: ton vrai profil
    github: "https://github.com", // TODO: ton GitHub
  },
};

export const NAV_LINKS = [
  { label: "À propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { label: "Labs", value: "BETA", hint: "À remplir (ex: 12 labs)" },
  { label: "Docs", value: "BETA", hint: "PDF + étapes + validation" },
  { label: "Focus", value: "Infra/Cyber", hint: "SISR orienté entreprise" },
  { label: "Objectif", value: "Stage solide", hint: "ESN / grande entreprise" },
];

export const SKILLS = [
  {
    title: "Réseaux",
    items: ["VLAN / Trunk / Inter-VLAN", "DHCP, DNS, NAT", "Routage (bases)"],
  },
  {
    title: "Systèmes",
    items: ["Debian (services, hardening)", "Windows Server (AD, GPO)", "VMware"],
  },
  {
    title: "Outils",
    items: ["Wireshark", "Git", "PowerShell / Bash"],
  },
];

export const PROJECT_PLACEHOLDERS = [
  {
    title: "Enterprise Lab — AD/DNS/DHCP",
    desc: "Architecture + config + tests + incidents (preuve par logs/captures).",
    tags: ["Windows Server", "AD", "DNS", "DHCP"],
  },
  {
    title: "Cisco — VLAN / Inter-VLAN / DHCP Relay",
    desc: "Topo + configs + validation + dépannage (méthodo claire).",
    tags: ["Cisco", "VLAN", "Routing"],
  },
  {
    title: "Wireshark — ARP / DORA / DNS",
    desc: "Analyse de trames + explications faciles + captures propres.",
    tags: ["Wireshark", "ARP", "DHCP", "DNS"],
  },
];
