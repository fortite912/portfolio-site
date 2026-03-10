import Link from "next/link";
import { SITE } from "@/lib/site";

const quickLinks = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

const techStack = ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"];

export function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="mx-auto max-w-[1120px] px-5 py-10 space-y-8">
        {/* Top section */}
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-3 group">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.15))",
                  border: "1px solid rgba(96,165,250,0.2)",
                  color: "var(--color-accent)",
                }}
              >
                SF
              </div>
              <div>
                <p className="text-sm font-bold">{SITE.name}</p>
                <p className="text-[10px] uppercase tracking-wider" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                  {SITE.role}
                </p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed max-w-[220px]" style={{ color: "var(--color-muted)" }}>
              Portfolio SISR avec labs documentés et preuves vérifiables.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
              Navigation
            </p>
            <ul className="space-y-1.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors duration-200 hover:text-[var(--color-accent)]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
              Liens
            </p>
            <ul className="space-y-1.5">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:text-[var(--color-accent)]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  href={SITE.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:text-[var(--color-accent2)]"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                  href={SITE.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  LinkedIn
                </a>
              </li>
              {SITE.links.email && (
                <li>
                  <a
                    className="inline-flex items-center gap-2 text-sm transition-all duration-200 hover:text-[var(--color-green)]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    href={`mailto:${SITE.links.email}`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    Email
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            &copy; {new Date().getFullYear()} {SITE.name}
          </p>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
            <span>Built with</span>
            {techStack.map((t, i) => (
              <span key={t}>
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{t}</span>
                {i < techStack.length - 1 && <span className="mx-1" style={{ opacity: 0.3 }}>/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
