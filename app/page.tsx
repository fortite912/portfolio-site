import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CountUp } from "@/components/count-up";

/* ===== SVG icon components ===== */
const IconFolder = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconZap = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-yellow)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconAward = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const IconGlobe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconCloud = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

/* ===== Data ===== */
const STATS = [
  { value: "6", label: "Labs documentés", sublabel: "avec preuves", Icon: IconFolder },
  { value: "20+", label: "Validations", sublabel: "100% taux de réussite", Icon: IconCheck },
  { value: "4", label: "Technos clés", sublabel: "sys / réseau / cloud / cyber", Icon: IconZap },
  { value: "2", label: "Certifs visées", sublabel: "AZ-900 acquis", Icon: IconAward },
];

const SKILLS = [
  {
    Icon: IconMonitor,
    title: "Systèmes",
    items: ["Windows Server", "AD DS", "DNS", "DHCP", "GPO", "PowerShell"],
    color: "accent",
    level: 85,
  },
  {
    Icon: IconGlobe,
    title: "Réseau",
    items: ["Cisco IOS", "VLAN", "STP", "LACP", "OSPF", "Wireshark"],
    color: "purple",
    level: 75,
  },
  {
    Icon: IconShield,
    title: "Cybersécurité",
    items: ["SSH hardening", "PKI / TLS", "ARP analysis", "Capture réseau", "Firewall / NSG"],
    color: "green",
    level: 65,
  },
  {
    Icon: IconCloud,
    title: "Cloud",
    items: ["Azure VNet", "NSG", "VMs", "CLI", "Portal"],
    color: "cyan",
    level: 55,
  },
];

const colorMap: Record<string, string> = {
  accent: "rgba(96,165,250,0.08)",
  purple: "rgba(167,139,250,0.08)",
  green: "rgba(52,211,153,0.08)",
  cyan: "rgba(34,211,238,0.08)",
};

const borderMap: Record<string, string> = {
  accent: "rgba(96,165,250,0.15)",
  purple: "rgba(167,139,250,0.15)",
  green: "rgba(52,211,153,0.15)",
  cyan: "rgba(34,211,238,0.15)",
};

const accentColors: Record<string, string> = {
  accent: "var(--color-accent)",
  purple: "var(--color-accent2)",
  green: "var(--color-green)",
  cyan: "var(--color-cyan)",
};

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-24">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none hidden md:block"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full pointer-events-none hidden md:block"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        <div className="relative grid md:grid-cols-[1fr,auto] gap-12 items-center pt-6 md:pt-10">
          {/* Left: Text content */}
          <div className="space-y-7">
            <div className="animate-in">
              <span
                className="availability-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
                style={{
                  color: "var(--color-green)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full badge-live"
                  style={{
                    background: "var(--color-green)",
                    boxShadow: "0 0 6px var(--color-green)",
                  }}
                />
                {SITE.availability.label} &mdash; {SITE.availability.dateRange}
              </span>
            </div>

            <div className="animate-in" style={{ animationDelay: "80ms" }}>
              <h1 className="heading-xl text-gradient glow-text leading-tight">
                {SITE.tagline}
              </h1>
            </div>

            <p
              className="max-w-xl text-base leading-relaxed animate-in"
              style={{ color: "var(--color-muted)", animationDelay: "160ms" }}
            >
              Je construis des labs proches du terrain : architecture, configuration,
              validation et dépannage. Chaque projet est livré avec des{" "}
              <span className="font-semibold" style={{ color: "var(--color-accent)" }}>preuves vérifiables</span>.
            </p>

            <div className="flex flex-wrap gap-3 animate-in" style={{ animationDelay: "240ms" }}>
              <Link className="btn btn-primary btn-lg" href="/projects">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                Voir les projets
              </Link>
              <Link className="btn btn-lg" href="/contact">
                Me contacter
              </Link>
              <a className="btn btn-lg" href={SITE.links.cv} target="_blank" rel="noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                CV
              </a>
            </div>
          </div>

          {/* Right: Terminal card — Desktop */}
          <div className="hidden md:block animate-in w-[340px]" style={{ animationDelay: "300ms" }}>
            <div className="terminal">
              <div className="terminal-header">
                <span className="terminal-dot" style={{ background: "#ff5f57" }} />
                <span className="terminal-dot" style={{ background: "#febc2e" }} />
                <span className="terminal-dot" style={{ background: "#28c840" }} />
                <span className="text-[11px] ml-2" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                  portfolio.sh
                </span>
              </div>
              <div className="terminal-body space-y-1">
                <p><span className="prompt">$</span> <span className="cmd">whoami</span></p>
                <p className="output">Sean Fritsch — BTS SIO SISR</p>
                <p className="mt-2"><span className="prompt">$</span> <span className="cmd">cat</span> <span className="flag">skills.conf</span></p>
                <p className="output">systemes=AD,DNS,DHCP,GPO</p>
                <p className="output">reseau=VLAN,STP,LACP,OSPF</p>
                <p className="output">cloud=Azure,VNet,NSG</p>
                <p className="output">cyber=SSH,PKI,TLS</p>
                <p className="mt-2"><span className="prompt">$</span> <span className="cmd">verify</span> <span className="flag">--proofs</span></p>
                <p className="success">6/6 labs validated</p>
                <p className="success">20+ checks passed</p>
                <p className="mt-2 typing-cursor"><span className="prompt">$</span> <span className="cmd">deploy</span> <span className="flag">--prod</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal card — Mobile (condensed) */}
        <div className="md:hidden animate-in mt-4" style={{ animationDelay: "300ms" }}>
          <div className="terminal">
            <div className="terminal-header">
              <span className="terminal-dot" style={{ background: "#ff5f57" }} />
              <span className="terminal-dot" style={{ background: "#febc2e" }} />
              <span className="terminal-dot" style={{ background: "#28c840" }} />
              <span className="text-[10px] ml-2" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                portfolio.sh
              </span>
            </div>
            <div className="terminal-body space-y-0.5" style={{ padding: "12px", fontSize: "12px" }}>
              <p><span className="prompt">$</span> <span className="cmd">whoami</span></p>
              <p className="output">Sean Fritsch — BTS SIO SISR</p>
              <p className="mt-1.5"><span className="prompt">$</span> <span className="cmd">verify</span> <span className="flag">--proofs</span></p>
              <p className="success">6/6 labs validated ✓</p>
              <p className="mt-1.5 typing-cursor"><span className="prompt">$</span> <span className="cmd">deploy</span> <span className="flag">--prod</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <AnimateOnScroll key={s.label} delay={i * 80}>
              <div className="card card-hover p-5 text-center space-y-1">
                <div className="flex justify-center mb-2">
                  <s.Icon />
                </div>
                <div className="stat-number"><CountUp value={s.value} /></div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-[11px]" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>{s.sublabel}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== Skills ===== */}
      <section className="space-y-8">
        <AnimateOnScroll>
          <div className="text-center max-w-lg mx-auto space-y-3">
            <p className="heading-section">Compétences</p>
            <h2 className="heading-lg">Stack technique</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Compétences développées à travers des labs pratiques et des projets concrets.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill, i) => (
            <AnimateOnScroll key={skill.title} delay={i * 100}>
              <div
                className="card card-hover p-5 space-y-4"
                style={{ borderColor: borderMap[skill.color] }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: colorMap[skill.color], border: `1px solid ${borderMap[skill.color]}` }}
                  >
                    <skill.Icon />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{skill.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="skill-bar flex-1">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: accentColors[skill.color], fontFamily: "var(--font-mono)" }}>
                        {skill.level}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span key={item} className="tag-code">{item}</span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== Approach ===== */}
      <section className="space-y-8">
        <AnimateOnScroll>
          <div className="text-center max-w-lg mx-auto space-y-3">
            <p className="heading-section">Méthodologie</p>
            <h2 className="heading-lg">Preuves avant tout</h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Chaque lab suit un workflow rigoureux de bout en bout.
            </p>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SITE.focus.map((f, i) => (
            <AnimateOnScroll key={f.title} delay={i * 60}>
              <div className="card card-hover p-5 text-center space-y-2 relative overflow-hidden noise">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto"
                  style={{
                    background: "linear-gradient(135deg, rgba(96,165,250,0.1), rgba(167,139,250,0.08))",
                    border: "1px solid rgba(96,165,250,0.15)",
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{f.hint}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== Featured projects ===== */}
      <section className="space-y-8">
        <AnimateOnScroll>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="heading-section">Sélection</p>
              <h2 className="heading-lg mt-2">Projets à la une</h2>
            </div>
            <Link className="btn text-sm" href="/projects">
              Tout voir
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <AnimateOnScroll key={p.slug} delay={i * 100}>
              <ProjectCard project={p} />
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CTA final ===== */}
      <AnimateOnScroll>
        <section className="card-gradient-border p-8 md:p-14 text-center space-y-6 relative overflow-hidden noise">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(96,165,250,0.06), transparent 70%)",
            }}
          />
          <div className="relative space-y-6">
            <h2 className="heading-lg text-gradient">Intéressé par mon profil ?</h2>
            <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Je cherche un CDD en systèmes, réseaux ou cybersécurité.
              Chaque lab est documenté avec des preuves vérifiables.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link className="btn btn-primary btn-lg" href="/contact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Me contacter
              </Link>
              <a className="btn btn-lg" href={SITE.links.cv} target="_blank" rel="noreferrer">
                Télécharger le CV
              </a>
            </div>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
