// app/certifications/page.tsx
import { certifications } from "@/lib/certifications";

export default function CertificationsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Certifications</h1>
        <p className="text-white/70">Plan clair : cours + labs + preuves. Pas de blabla.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {certifications.map((c) => (
          <article key={c.slug} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-white/70">{c.subtitle}</p>
              </div>
              <div className="pill">{c.status}</div>
            </div>

            <p className="mt-3 text-sm text-white/80">{c.description}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {c.tags.map((t) => (
                <span key={t} className="pill pill-muted">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
