import Image from "next/image";
import { certifications } from "@/lib/certifications";

const sStyle: Record<string, string> = {
  Acquis: "pill-green",
  "En cours": "pill-yellow",
  "\u00c0 venir": "pill-accent",
};

export default function CertificationsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="heading-section">Parcours</p>
        <h1 className="heading-lg">Certifications</h1>
        <p style={{ color: "var(--color-muted)" }} className="text-[15px]">
          Plan clair : cours + labs + preuves.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((c, i) => (
          <article
            key={c.slug}
            className="card card-hover overflow-hidden animate-in"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {c.cover && (
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={c.cover}
                  alt={c.title}
                  fill
                  className="object-cover"
                  style={{ opacity: 0.6 }}
                  sizes="(max-width:768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(10,12,16,0.95), rgba(10,12,16,0.3), transparent)",
                  }}
                />
              </div>
            )}

            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {c.subtitle}
                  </p>
                </div>
                <span
                  className={`pill shrink-0 ${sStyle[c.status] ?? ""}`}
                  style={{ fontSize: 11 }}
                >
                  {c.status}
                </span>
              </div>

              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {c.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span
                    key={t}
                    className="pill pill-muted"
                    style={{ fontSize: 11 }}
                  >
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
