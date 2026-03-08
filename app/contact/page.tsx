import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="h1 text-3xl">Contact</h1>
        <p className="text-white/55">
          R&eacute;ponse rapide si le message est pr&eacute;cis (contexte +
          objectif + date).
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Coordonnees */}
        <div className="card p-6 space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40 font-medium">
              Email
            </div>
            {SITE.links.email && (
              <a
                className="link mt-2 inline-block text-lg"
                href={`mailto:${SITE.links.email}`}
              >
                {SITE.links.email}
              </a>
            )}
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40 font-medium">
              Liens
            </div>
            <div className="mt-2 flex flex-wrap gap-3">
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

        {/* Disponibilité */}
        <div className="card p-6 space-y-5">
          <div>
            <div className="text-xs uppercase tracking-wide text-white/40 font-medium">
              Disponibilit&eacute;
            </div>
            <div className="mt-2 space-y-1 text-sm text-white/75">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--green))]" />
                {SITE.availability.label}
              </div>
              {SITE.availability.dateRange && (
                <div className="text-white/55">
                  {SITE.availability.dateRange}
                </div>
              )}
              {SITE.availability.location && (
                <div className="text-white/55">
                  {SITE.availability.location}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wide text-white/40 font-medium">
              Pour un premier contact
            </div>
            <ul className="mt-2 space-y-1.5 text-sm text-white/65">
              <li>Stack demand&eacute;e</li>
              <li>P&eacute;riode + dur&eacute;e</li>
              <li>Format d&rsquo;entretien</li>
              <li>Mission vis&eacute;e (r&eacute;seau / sys / cyber)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
