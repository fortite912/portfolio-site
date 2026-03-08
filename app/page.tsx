import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

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
  { value: "4", label: "Labs documentés", Icon: IconFolder },
  { value: "15+", label: "Validations", Icon: IconCheck },
  { value: "3", label: "Technos clés", Icon: IconZap },
  { value: "2", label: "Certifs visées", Icon: IconAward },
];

const SKILLS = [
  {
    Icon: IconMonitor,
    title: "Systèmes",
    items: ["Windows Server", "AD DS", "DNS", "DHCP", "GPO", "PowerShell"],
    color: "accent",
  },
  {
    Icon: IconGlobe,
    title: "Réseau",
    items: ["Cisco IOS", "VLAN", "STP", "LACP", "OSPF", "Wireshark"],
    color: "purple",
  },
  {
    Icon: IconShield,
    title: "Cybersécurité",
    items: ["NSG", "Firewall rules", "ARP analysis", "Capture réseau"],
    color: "green",
  },
  {
    Icon: IconCloud,
    title: "Cloud",
    items: ["Azure VNet", "NSG", "VMs", "CLI", "Portal"],
    color: "cyan",
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

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-20">
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none hidden md:block"
          style={{
            background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative space-y-8 pt-4">
          <div className="animate-in">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(52,211,153,0.06)",
                border: "1px solid rgba(52,211,153,0.15)",
                color: "var(--color-green)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: "var(--color-green)",
                  boxShadow: "0 0 6px var(--color-green)",
                }}
              />
              {SITE.availability.label}
            </span>
          </div>

          <div className="animate-in" style={{ animationDelay: "80ms" }}>
            <h1 className="heading-xl text-gradient max-w-3xl leading-tight">
              {SITE.tagline}
            </h1>
          </div>

          <p
            className="max-w-2xl text-base leading-relaxed animate-in"
            style={{ color: "var(--color-muted)", animationDelay: "160ms" }}
          >
            Je construis des labs proches du terrain : architecture → configuration →
            validation → dépannage. Chaque projet est livré avec des{" "}
            <span style={{ color: "var(--color-accent)" }}>preuves vérifiables</span>.
          </p>

          <div className="flex flex-wrap gap-2 animate-in" style={{ animationDelay: "240ms" }}>
            {(SITE.badges ?? []).map((b) => (
              <span key={b} className="pill pill-accent">{b}</span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 animate-in" style={{ animationDelay: "320ms" }}>
            <Link className="btn btn-primary btn-lg" href="/projects">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Voir les projets
            </Link>
            <Link className="btn btn-lg" href="/contact">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Me contacter
            </Link>
            <a className="btn btn-lg" href={SITE.links.cv} target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Télécharger le CV
            </a>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <AnimateOnScroll key={s.label} delay={i * 80}>
              <div className="card p-5 text-center">
                <div className="flex justify-center mb-3">
                  <s.Icon />
                </div>
                <div className="stat-number">{s.value}</div>
                <p className="text-xs font-medium mt-1" style={{ color: "var(--color-muted)" }}>{s.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="heading-section">Compétences</p>
            <h2 className="heading-lg mt-2">Stack technique</h2>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill, i) => (
            <AnimateOnScroll key={skill.title} delay={i * 100}>
              <div
                className="card card-hover p-5"
                style={{ borderColor: borderMap[skill.color] }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: colorMap[skill.color], border: `1px solid ${borderMap[skill.color]}` }}
                  >
                    <skill.Icon />
                  </div>
                  <h3 className="font-semibold">{skill.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="tag-code"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== Approach ===== */}
      <section className="space-y-6">
        <AnimateOnScroll>
          <div>
            <p className="heading-section">Méthodologie</p>
            <h2 className="heading-lg mt-2">Preuves avant tout</h2>
          </div>
        </AnimateOnScroll>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SITE.focus.map((f, i) => (
            <AnimateOnScroll key={f.title} delay={i * 60}>
              <div className="card card-hover p-4">
                <div
                  className="mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "11px" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-sm font-semibold mb-1">{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{f.hint}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </section>

      {/* ===== Featured projects ===== */}
      <section className="space-y-6">
        <AnimateOnScroll>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="heading-section">Sélection</p>
              <h2 className="heading-lg mt-2">Projets à la une</h2>
            </div>
            <Link className="btn text-sm" href="/projects">
              Tout voir →
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

      {/* ===== CTA final ===== */}
      <AnimateOnScroll>
        <section className="card card-glow p-8 md:p-12 text-center space-y-5">
          <h2 className="heading-lg">Intéressé par mon profil ?</h2>
          <p className="max-w-lg mx-auto text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Je cherche un stage en systèmes, réseaux ou cybersécurité.
            Chaque lab est documenté avec des preuves vérifiables.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link className="btn btn-primary btn-lg" href="/contact">Me contacter</Link>
            <a className="btn btn-lg" href={SITE.links.cv} target="_blank" rel="noreferrer">Télécharger le CV</a>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
