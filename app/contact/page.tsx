import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="heading-section">Disponible</p>
        <h1 className="heading-lg">Contact</h1>
        <p style={{ color: "var(--color-muted)" }} className="text-[15px]">
          R&eacute;ponse rapide si le message est pr&eacute;cis.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Coordonnees */}
        <div className="card p-6 space-y-6">
          <div>
            <p className="heading-section mb-2">Email</p>
            {SITE.links.email && (
              <a className="link text-lg font-medium" href={`mailto:${SITE.links.email}`}>
                {SITE.links.email}
              </a>
            )}
          </div>

          <div>
            <p className="heading-section mb-3">Liens</p>
            <div className="flex flex-wrap gap-2">
              <a
                className="btn text-sm"
                href={SITE.links.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                className="btn text-sm"
                href={SITE.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a className="btn btn-primary text-sm" href={SITE.links.cv}>
                CV
              </a>
            </div>
          </div>
        </div>

        {/* Disponibilite */}
        <div className="card p-6 space-y-6">
          <div>
            <p className="heading-section mb-2">Disponibilit&eacute;</p>
            <div className="space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "var(--color-green)" }}
                />
                {SITE.availability.label}
              </div>
              {SITE.availability.dateRange && (
                <p style={{ color: "var(--color-muted)" }}>
                  {SITE.availability.dateRange}
                </p>
              )}
              {SITE.availability.location && (
                <p style={{ color: "var(--color-muted)" }}>
                  {SITE.availability.location}
                </p>
              )}
            </div>
          </div>

          <div>
            <p className="heading-section mb-3">Premier contact</p>
            <ul
              className="space-y-2 text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <li className="flex gap-2">
                <span style={{ color: "var(--color-accent)" }}>&bull;</span>
                Stack demand&eacute;e
              </li>
              <li className="flex gap-2">
                <span style={{ color: "var(--color-accent)" }}>&bull;</span>
                P&eacute;riode + dur&eacute;e
              </li>
              <li className="flex gap-2">
                <span style={{ color: "var(--color-accent)" }}>&bull;</span>
                Format d&rsquo;entretien
              </li>
              <li className="flex gap-2">
                <span style={{ color: "var(--color-accent)" }}>&bull;</span>
                Mission vis&eacute;e (r&eacute;seau / sys / cyber)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
