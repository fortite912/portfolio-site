// app/contact/page.tsx
import { SITE } from "@/lib/site";

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Contact</h1>
        <p className="text-white/70">Réponse rapide si le message est précis (contexte + objectif + date).</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-white/60">Email</div>
          <a className="link mt-2 inline-block" href={`mailto:${SITE.links.email}`}>
            {SITE.links.email}
          </a>

          <div className="mt-4 text-xs uppercase tracking-wide text-white/60">Liens</div>
          <div className="mt-2 flex flex-wrap gap-3">
            <a className="link" href={SITE.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="link" href={SITE.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="link" href={SITE.links.cv}>
              CV
            </a>
          </div>
        </div>

        <div className="card p-4">
          <div className="text-xs uppercase tracking-wide text-white/60">Stage</div>
          <div className="mt-2 text-sm text-white/80">
            {SITE.availability.label} — {SITE.availability.dateRange} — {SITE.availability.location}
          </div>

          <div className="mt-4 text-sm text-white/70">
            À envoyer : stack demandée + période + format d’entretien + mission visée (réseau/sys/cyber).
          </div>
        </div>
      </div>
    </div>
  );
}
