import type { Metadata } from "next";
import Image from "next/image";
import { certifications } from "@/lib/certifications";

export const metadata: Metadata = {
  title: "Certifications — Sean Fritsch",
  description: "Parcours certifications Azure : AZ-900 acquis, AZ-104 en préparation.",
};

const statusStyle: Record<string, { pill: string; icon: string }> = {
  Acquis: { pill: "pill-green", icon: "✓" },
  "En cours": { pill: "pill-yellow", icon: "◉" },
  "À venir": { pill: "pill-accent", icon: "○" },
};

export default function CertificationsPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="heading-section">Parcours</p>
        <h1 className="heading-lg">Certifications</h1>
        <p className="text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Plan structuré : cours, labs documentés, captures et checklists de validation.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((c, i) => {
          const st = statusStyle[c.status] ?? { pill: "", icon: "?" };
          return (
            <article
              key={c.slug}
              className="card card-hover overflow-hidden animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {c.cover && (
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={c.cover}
                    alt={c.title}
                    fill
                    className="object-cover"
                    style={{ opacity: 0.5 }}
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(6,8,13,0.98), rgba(6,8,13,0.4), rgba(6,8,13,0.2))",
                    }}
                  />
                  <div className="absolute bottom-3 right-4">
                    <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>
                      {st.icon} {c.status}
                    </span>
                  </div>
                </div>
              )}

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="font-semibold text-[15px]">{c.title}</h3>
                  <p className="mt-1 text-sm" style={{ color: "var(--color-muted)" }}>
                    {c.subtitle}
                  </p>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {c.description}
                </p>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-medium" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
                      Progression
                    </span>
                    <span className="text-[11px] font-medium" style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
                      {c.status === "Acquis" ? "100%" : c.status === "En cours" ? "45%" : "0%"}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{
                        width: c.status === "Acquis" ? "100%" : c.status === "En cours" ? "45%" : "0%",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        color: "var(--color-muted)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
