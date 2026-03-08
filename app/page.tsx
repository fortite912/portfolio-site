import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

const STATS = [
  { value: "4", label: "Labs documentés", icon: "📁" },
  { value: "15+", label: "Validations", icon: "✓" },
  { value: "3", label: "Technos clés", icon: "⚡" },
  { value: "2", label: "Certifs visées", icon: "🎯" },
];

const SKILLS = [
  {
    icon: "🖥️",
    title: "Systèmes",
    items: ["Windows Server", "AD DS", "DNS", "DHCP", "GPO", "PowerShell"],
    color: "accent",
  },
  {
    icon: "🌐",
    title: "Réseau",
    items: ["Cisco IOS", "VLAN", "STP", "LACP", "OSPF", "Wireshark"],
    color: "purple",
  },
  {
    icon: "🛡️",
    title: "Cybersécurité",
    items: ["NSG", "Firewall rules", "ARP analysis", "Capture réseau"],
    color: "green",
  },
  {
    icon: "☁️",
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
          {/* Status badge */}
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
            <div key={s.label} className="card p-5 text-center animate-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="stat-number">{s.value}</div>
              <p className="text-xs font-medium mt-1" style={{ color: "var(--color-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Skills ===== */}
      <section className="space-y-6">
        <div>
          <p className="heading-section">Compétences</p>
          <h2 className="heading-lg mt-2">Stack technique</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.title}
              className="card p-5 animate-in"
              style={{ animationDelay: `${i * 80}ms`, borderColor: borderMap[skill.color] }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: colorMap[skill.color], border: `1px solid ${borderMap[skill.color]}` }}
                >
                  {skill.icon}
                </div>
                <h3 className="font-semibold">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Approach ===== */}
      <section className="space-y-6">
        <div>
          <p className="heading-section">Méthodologie</p>
          <h2 className="heading-lg mt-2">Preuves avant tout</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {SITE.focus.map((f, i) => (
            <div key={f.title} className="card p-4 animate-in" style={{ animationDelay: `${i * 60}ms` }}>
              <div
                className="mb-1"
                style={{ fontFamily: "var(--font-mono)", color: "var(--color-accent)", fontSize: "11px" }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="text-sm font-semibold mb-1">{f.title}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>{f.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Featured projects ===== */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="heading-section">Sélection</p>
            <h2 className="heading-lg mt-2">Projets à la une</h2>
          </div>
          <Link className="btn text-sm" href="/projects">
            Tout voir →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div key={p.slug} className="animate-in" style={{ animationDelay: `${i * 100}ms` }}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA final ===== */}
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
    </div>
  );
}
