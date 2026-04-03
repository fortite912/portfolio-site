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
    pdf: "/projects/rapport-dhcp-ddns-ssh.pdf",
    reportTitle: "Rapports DNS & DHCP",
    reportPdf: "/projects/rapport-dns-bind9.pdf",
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
    pdf: "/projects/rapport-arp-wireshark.pdf",
    reportTitle: "Rapport ARP Wireshark",
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
    pdf: "/projects/rapport-vlan-stp-etherchannel.pdf",
    reportTitle: "Rapport VLAN / InterVLAN / EtherChannel",
    reportPdf: "/projects/rapport-vlan-intervlan.pdf",
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
    title: "Azure — VNet / NSG (labs)",
    subtitle: "Réseau Azure, sous-réseaux, règles, tests de connectivité.",
    tags: ["Azure", "VNet", "NSG"],
    cover: "/media/azure.png",
    status: "In progress",
    category: "Cloud",
    stack: ["Azure Portal", "CLI", "VMs"],
    objective:
      "Créer un réseau Azure segmenté et valider les flux via NSG.",
    method: ["VNet + subnets", "NSG rules", "VMs", "tests"],
    validation: ["ping/ssh", "rules effective", "logs si dispo"],
    deliverables: ["notes", "captures", "export règles"],
    proof: [
      "Capture ping/ssh entre VMs",
      "Règles NSG effectives (portal / CLI)",
      "Logs de flux réseau",
      "Screenshots VMs déployées",
    ],
    timeline: [
      { title: "Infra", details: ["VNet", "subnets", "NSG"], badge: "Semaine 1" },
      { title: "VMs", details: ["déploiement", "config réseau"], badge: "Semaine 2" },
      { title: "Tests", details: ["ping", "ssh", "vérification règles"], badge: "Semaine 3" },
    ],
  },
  {
    slug: "ssh-configuration",
    title: "SSH — Configuration sécurisée",
    subtitle: "Mise en place, durcissement et tests SSH sur serveur Linux.",
    tags: ["SSH", "Linux", "Sécurité", "OpenSSH"],
    cover: "/media/cisco.png",
    status: "Done",
    category: "Cybersécurité",
    stack: ["Linux", "OpenSSH", "Bash"],
    pdf: "/projects/rapport-ssh-configuration.pdf",
    reportTitle: "Rapport SSH Configuration",
    objective:
      "Configurer un accès SSH sécurisé avec authentification par clé, durcissement et tests de connectivité.",
    method: [
      "Installation et configuration OpenSSH",
      "Génération de clés RSA/ED25519",
      "Durcissement sshd_config",
      "Tests de connexion et audit",
    ],
    validation: [
      "Connexion par clé sans mot de passe",
      "Refus des connexions root",
      "Port personnalisé fonctionnel",
    ],
    deliverables: ["Rapport détaillé", "Captures de configuration", "Checklist sécurité"],
    proof: [
      "Connexion SSH par clé réussie",
      "sshd_config durci (PermitRootLogin no)",
      "Test de connexion sur port personnalisé",
      "Vérification des logs auth.log",
    ],
    timeline: [
      { title: "Setup", details: ["Installation OpenSSH", "Configuration réseau"], badge: "Étape 1" },
      { title: "Clés", details: ["Génération RSA/ED25519", "Déploiement authorized_keys"], badge: "Étape 2" },
      { title: "Durcissement", details: ["sshd_config", "Fail2ban", "Tests"], badge: "Étape 3" },
    ],
  },
  {
    slug: "pki-certificats",
    title: "PKI — Infrastructure de certificats",
    subtitle: "Mise en place d'une PKI, autorité de certification et certificats.",
    tags: ["PKI", "Certificats", "CA", "TLS"],
    cover: "/media/ad-dns.png",
    status: "Done",
    category: "Cybersécurité",
    stack: ["OpenSSL", "Linux", "Windows Server"],
    pdf: "/projects/rapport-pki.pdf",
    reportTitle: "Rapport PKI",
    objective:
      "Déployer une infrastructure à clé publique avec autorité de certification et émettre des certificats.",
    method: [
      "Création de l'autorité racine (CA)",
      "Génération de certificats serveur",
      "Déploiement et validation TLS",
      "Révocation et CRL",
    ],
    validation: [
      "Certificat CA émis et valide",
      "Certificat serveur signé par la CA",
      "Connexion TLS fonctionnelle",
    ],
    deliverables: ["Rapport TP", "Captures OpenSSL", "Chaîne de certificats"],
    proof: [
      "Certificat CA auto-signé vérifié",
      "Certificat serveur émis et validé",
      "Connexion HTTPS avec certificat custom",
    ],
    timeline: [
      { title: "CA", details: ["Clé privée CA", "Certificat racine"], badge: "Étape 1" },
      { title: "Certificats", details: ["CSR", "Signature", "Déploiement"], badge: "Étape 2" },
      { title: "Validation", details: ["Test TLS", "Révocation", "CRL"], badge: "Étape 3" },
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
    "ssh-configuration",
  ];
  return PROJECTS.filter((p) => featuredSlugs.includes(p.slug));
}
