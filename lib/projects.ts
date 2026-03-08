import type { Project } from "./types";

const PROJECTS: Project[] = [
  {
    slug: "ad-dns-dhcp",
    title: "AD DS + DNS + DHCP (VMware)",
    subtitle: "Domaine Windows, services, GPO, clients + validations.",
    tags: ["Windows", "AD", "DNS", "DHCP", "GPO"],
    cover: "/media/ad-dns.png",
    status: "In progress",
    category: "Syst\u00e8mes",
    stack: ["Windows Server", "VMware", "PowerShell"],
    objective:
      "D\u00e9ployer un domaine AD avec DNS + DHCP et valider l\u2019int\u00e9gration de clients + GPO.",
    method: [
      "Plan d\u2019adressage + naming",
      "Installation AD DS + DNS",
      "Cr\u00e9ation scopes DHCP + options",
      "Jonction des clients + GPO",
    ],
    validation: [
      "R\u00e9solution DNS (nslookup)",
      "Attribution DHCP (ipconfig /all)",
      "GPO appliqu\u00e9es (gpresult)",
    ],
    deliverables: [
      "Captures + commandes",
      "Checklist de validation",
      "Export config / notes",
    ],
    proof: [
      "Capture nslookup montrant la r\u00e9solution DNS",
      "ipconfig /all avec bail DHCP actif",
      "gpresult /R confirmant les GPO",
      "Capture d\u2019\u00e9cran du gestionnaire AD DS",
    ],
    timeline: [
      {
        title: "Setup",
        details: ["VMs", "IP plan", "naming"],
        badge: "Semaine 1",
      },
      {
        title: "Services",
        details: ["AD DS", "DNS", "DHCP"],
        badge: "Semaine 2",
      },
      {
        title: "Validation",
        details: ["clients", "GPO", "tests"],
        badge: "Semaine 3",
      },
    ],
  },
  {
    slug: "wireshark-arp",
    title: "Wireshark \u2014 ARP + analyse",
    subtitle: "Captures ARP, lecture trames, interpr\u00e9tation attendu/observ\u00e9.",
    tags: ["Wireshark", "ARP", "Frames"],
    cover: "/media/wireshark.png",
    status: "Done",
    category: "Preuves",
    stack: ["Wireshark", "Linux"],
    objective:
      "Capturer et expliquer des \u00e9changes ARP en conditions contr\u00f4l\u00e9es.",
    method: [
      "Sc\u00e9nario (2 h\u00f4tes + switch)",
      "Capture Wireshark c\u00f4t\u00e9 client",
      "Filtrage ARP + lecture champs",
    ],
    validation: [
      "Requ\u00eate ARP broadcast",
      "R\u00e9ponse ARP unicast",
      "Correspondance IP/MAC",
    ],
    deliverables: ["PCAP", "notes d\u2019analyse", "captures comment\u00e9es"],
    proof: [
      "Requ\u00eate ARP broadcast captur\u00e9e (ff:ff:ff:ff:ff:ff)",
      "R\u00e9ponse ARP unicast valid\u00e9e",
      "Correspondance IP/MAC confirm\u00e9e dans la table ARP",
      "Fichier PCAP fourni",
    ],
    timeline: [
      { title: "Pr\u00e9paration", details: ["topologie", "2 VMs", "Wireshark"] },
      {
        title: "Capture",
        details: ["filtre ARP", "ping entre h\u00f4tes", "analyse trames"],
      },
      {
        title: "Analyse",
        details: ["champs Ethernet/ARP", "attendu vs observ\u00e9", "conclusion"],
      },
    ],
  },
  {
    slug: "cisco-vlan-stp-lacp",
    title: "Cisco VLAN / STP / EtherChannel",
    subtitle: "VLANs, trunks, STP par VLAN, LACP + validations.",
    tags: ["Cisco", "VLAN", "STP", "LACP"],
    cover: "/media/cisco.png",
    status: "In progress",
    category: "R\u00e9seau",
    stack: ["Cisco IOS", "Packet Tracer"],
    objective:
      "Segmenter (VLAN), s\u00e9curiser L2 (STP), agr\u00e9ger liens (LACP) et prouver le fonctionnement.",
    method: ["Cr\u00e9ation VLANs", "Trunks", "STP tuning", "Port-channel LACP"],
    validation: [
      "show vlan brief",
      "show spanning-tree",
      "show etherchannel summary",
    ],
    deliverables: ["topologie", "configs", "captures commandes", "checklist"],
    proof: [
      "show vlan brief confirmant la segmentation",
      "show spanning-tree montrant le root bridge",
      "show etherchannel summary validant LACP",
      "Topologie Packet Tracer export\u00e9e",
    ],
    timeline: [
      { title: "VLANs", details: ["cr\u00e9ation", "assignation ports", "trunk"] },
      { title: "STP", details: ["root bridge", "priority", "portfast"] },
      {
        title: "LACP",
        details: ["port-channel", "mode active", "v\u00e9rification"],
      },
    ],
  },
  {
    slug: "azure-vnet-nsg",
    title: "Azure \u2014 VNet / NSG (labs)",
    subtitle: "R\u00e9seau Azure, sous-r\u00e9seaux, r\u00e8gles, tests de connectivit\u00e9.",
    tags: ["Azure", "VNet", "NSG"],
    cover: "/media/azure.png",
    status: "Planned",
    category: "Cloud",
    stack: ["Azure Portal", "CLI"],
    objective:
      "Cr\u00e9er un r\u00e9seau Azure segment\u00e9 et valider les flux via NSG.",
    method: ["VNet + subnets", "NSG rules", "VMs", "tests"],
    validation: ["ping/ssh", "rules effective", "logs si dispo"],
    deliverables: ["notes", "captures", "export r\u00e8gles"],
    proof: [
      "Capture ping/ssh entre VMs",
      "R\u00e8gles NSG effectives (portal / CLI)",
      "Logs de flux r\u00e9seau",
    ],
    timeline: [
      { title: "Infra", details: ["VNet", "subnets", "NSG"] },
      { title: "VMs", details: ["d\u00e9ploiement", "config r\u00e9seau"] },
      { title: "Tests", details: ["ping", "ssh", "v\u00e9rification r\u00e8gles"] },
    ],
  },
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  const featuredSlugs = [
    "ad-dns-dhcp",
    "cisco-vlan-stp-lacp",
    "wireshark-arp",
  ];
  return PROJECTS.filter((p) => featuredSlugs.includes(p.slug));
}
