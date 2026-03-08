import Image from "next/image";
import { certifications } from "@/lib/certifications";

const statusStyle: Record<string, string> = {
  "Acquis": "pill-green",
  "En cours": "pill-yellow",
  "\u00c0 venir": "pill-accent",
};

export default function CertificationsPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="h1 text-3xl">Certifications</h1>
        <p className="text-white/55">
          Plan clair : cours + labs + preuves. Pas de blabla.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {certifications.map((c) => (
          <article key={c.slug} className="card card-hover overflow-hidden">
            {c.cover && (
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={c.cover}
                  alt={c.title}
                  fill
                  className="object-cover opacity-70"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
            )}

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-white/55">{c.subtitle}</p>
                </div>
                <span
                  className={`pill text-[11px] shrink-0 ${statusStyle[c.status] ?? ""}`}
                >
                  {c.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                {c.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="pill pill-muted text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
