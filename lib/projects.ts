// lib/projects.ts
import type { Project } from "./types";

const PROJECTS: Project[] = [
  {
    slug: "ad-dns-dhcp",
    title: "AD DS + DNS + DHCP (VMware)",
    subtitle: "Domaine Windows, services, GPO, clients + validations.",
    tags: ["Windows", "AD", "DNS", "DHCP", "GPO"],
    cover: "/media/ad-dns.png",
    status: "In progress",
    category: "Systèmes",
    stack: ["Windows Server", "VMware", "PowerShell"],

    objective: "Déployer un domaine AD avec DNS + DHCP et valider l’intégration de clients + GPO.",
    method: [
      "Plan d’adressage + naming",
      "Installation AD DS + DNS",
      "Création scopes DHCP + options",
      "Jonction des clients + GPO",
    ],
    validation: [
      "Résolution DNS (nslookup)",
      "Attribution DHCP (ipconfig /all)",
      "GPO appliquées (gpresult)",
    ],
    deliverables: [
      "Captures + commandes",
      "Checklist de validation",
      "Export config / notes",
    ],
    timeline: [
      { title: "Setup", details: ["VMs", "IP plan", "naming"] },
      { title: "Services", details: ["AD DS", "DNS", "DHCP"] },
      { title: "Validation", details: ["clients", "GPO", "tests"] },
    ],
  },
  {
    slug: "wireshark-arp",
    title: "Wireshark — ARP + analyse",
    subtitle: "Captures ARP, lecture trames, interprétation attendu/observé.",
    tags: ["Wireshark", "ARP", "Frames"],
    cover: "/media/wireshark.png",
    status: "Done",
    category: "Preuves",
    stack: ["Wireshark", "Linux"],

    objective: "Capturer et expliquer des échanges ARP en conditions contrôlées.",
    method: [
      "Scénario (2 hôtes + switch)",
      "Capture Wireshark côté client",
      "Filtrage ARP + lecture champs",
    ],
    validation: [
      "Requête ARP broadcast",
      "Réponse ARP unicast",
      "Correspondance IP/MAC",
    ],
    deliverables: ["PCAP", "notes d’analyse", "captures commentées"],
  },
  {
    slug: "cisco-vlan-stp-lacp",
    title: "Cisco VLAN / STP / EtherChannel",
    subtitle: "VLANs, trunks, STP par VLAN, LACP + validations.",
    tags: ["Cisco", "VLAN", "STP", "LACP"],
    cover: "/media/cisco.png",
    status: "In progress",
    category: "Réseau",
    stack: ["Cisco IOS", "Packet Tracer"],

    objective: "Segmenter (VLAN), sécuriser L2 (STP), agréger liens (LACP) et prouver le fonctionnement.",
    method: ["Création VLANs", "Trunks", "STP tuning", "Port-channel LACP"],
    validation: ["show vlan brief", "show spanning-tree", "show etherchannel summary"],
    deliverables: ["topologie", "configs", "captures commandes", "checklist"],
  },
  {
    slug: "azure-vnet-nsg",
    title: "Azure — VNet / NSG (labs)",
    subtitle: "Réseau Azure, sous-réseaux, règles, tests de connectivité.",
    tags: ["Azure", "VNet", "NSG"],
    cover: "/media/azure.png",
    status: "Planned",
    category: "Cloud",
    stack: ["Azure Portal", "CLI"],

    objective: "Créer un réseau Azure segmenté et valider les flux via NSG.",
    method: ["VNet + subnets", "NSG rules", "VMs", "tests"],
    validation: ["ping/ssh", "rules effective", "logs si dispo"],
    deliverables: ["notes", "captures", "export règles"],
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * IMPORTANT: cette fonction ne prend AUCUN argument (sinon tu retombes sur
 * “Expected 0 arguments, but got 1”).
 */
export function getFeaturedProjects(): Project[] {
  // top 3 “présentables”
  const featuredSlugs = ["ad-dns-dhcp", "cisco-vlan-stp-lacp", "wireshark-arp"];
  return PROJECTS.filter((p) => featuredSlugs.includes(p.slug));
}
