import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { CopyTemplate } from "@/components/copy-template";

export const metadata: Metadata = {
  title: "Contact — Sean Fritsch",
  description: "Disponible pour un stage en systèmes, réseaux ou cybersécurité.",
};

export default function ContactPage() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <p className="heading-section">Contact</p>
        <h1 className="heading-lg">Travaillons ensemble</h1>
        <p className="text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Disponible pour un stage en systèmes, réseaux ou cybersécurité.
          Réponse rapide si le message est précis.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Contact info */}
        <div className="space-y-5">
          {/* Email card */}
          <div className="card card-glow p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "var(--color-muted)" }}>Email</p>
                {SITE.links.email && (
                  <a
                    className="text-sm font-semibold hover:text-[var(--color-accent)] transition-colors"
                    href={`mailto:${SITE.links.email}`}
                  >
                    {SITE.links.email}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="card p-6 space-y-4">
            <p className="heading-section">Retrouvez-moi</p>
            <div className="space-y-3">
              <a
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)]"
                href={SITE.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-box">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Projets et code source</p>
                </div>
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </a>

              <a
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)]"
                href={SITE.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-box icon-box-purple">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">LinkedIn</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Profil professionnel</p>
                </div>
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
              </a>

              <a
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-[rgba(255,255,255,0.03)]"
                href={SITE.links.cv}
                target="_blank"
                rel="noreferrer"
              >
                <div className="icon-box icon-box-green">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Curriculum Vitae</p>
                  <p className="text-xs" style={{ color: "var(--color-muted)" }}>Télécharger en PDF</p>
                </div>
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Availability */}
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="icon-box icon-box-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <p className="text-sm font-semibold">{SITE.availability.label}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span
                    className="w-2 h-2 rounded-full badge-live"
                    style={{
                      background: "var(--color-green)",
                      boxShadow: "0 0 6px var(--color-green)",
                    }}
                  />
                  <span className="text-xs" style={{ color: "var(--color-green)" }}>Disponible</span>
                </div>
              </div>
            </div>

            <hr className="divider" />

            <div className="space-y-2 text-sm" style={{ color: "var(--color-muted)" }}>
              {SITE.availability.dateRange && (
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {SITE.availability.dateRange}
                </div>
              )}
              {SITE.availability.location && (
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {SITE.availability.location}
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
                Réponse sous 24h
              </div>
            </div>
          </div>

          {/* What to include */}
          <div className="card p-6 space-y-4">
            <p className="heading-section">Pour un premier contact</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Un message efficace contient :
            </p>
            <ul className="space-y-2.5">
              {[
                "Stack ou environnement demandé",
                "Période + durée du stage",
                "Format d\u2019entretien prévu",
                "Mission visée (réseau / sys / cyber)",
              ].map((item, i) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm animate-in"
                  style={{ color: "rgba(255,255,255,0.75)", animationDelay: `${i * 60}ms` }}
                >
                  <span
                    className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--color-accent)" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
            <CopyTemplate />
          </div>
        </div>
      </div>
    </div>
  );
}
