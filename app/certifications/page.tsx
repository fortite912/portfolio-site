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

const statusOrder = ["Acquis", "En cours", "À venir"];

export default function CertificationsPage() {
  const acquired = certifications.filter((c) => c.status === "Acquis").length;
  const total = certifications.length;
  const progressPercent = Math.round((acquired / total) * 100);

  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-3">
          <p className="heading-section">Parcours</p>
          <h1 className="heading-lg">Certifications</h1>
          <p className="text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Plan structuré : cours, labs documentés, captures et checklists de validation.
          </p>
        </div>

        {/* Roadmap progress */}
        <div className="card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Progression globale</p>
            <span
              className="text-sm font-bold"
              style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
            >
              {acquired}/{total}
            </span>
          </div>
          <div className="progress-bar" style={{ height: 6 }}>
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Roadmap steps */}
          <div className="overflow-x-auto -mx-5 px-5 pb-2">
            <div className="flex items-center gap-0 min-w-[400px]">
              {certifications
                .sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status))
                .map((c, i) => {
                  const st = statusStyle[c.status] ?? { pill: "", icon: "?" };
                  return (
                    <div key={c.slug} className="flex items-center flex-1">
                      <div className="flex flex-col items-center gap-1.5 flex-1">
                        <div
                          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-bold transition-transform duration-300 hover:scale-110"
                          style={{
                            background: c.status === "Acquis"
                              ? "rgba(52,211,153,0.15)"
                              : c.status === "En cours"
                              ? "rgba(251,191,36,0.1)"
                              : "rgba(255,255,255,0.04)",
                            border: `2px solid ${
                              c.status === "Acquis"
                                ? "rgba(52,211,153,0.4)"
                                : c.status === "En cours"
                                ? "rgba(251,191,36,0.3)"
                                : "rgba(255,255,255,0.08)"
                            }`,
                            color: c.status === "Acquis"
                              ? "var(--color-green)"
                              : c.status === "En cours"
                              ? "var(--color-yellow)"
                              : "var(--color-muted)",
                          }}
                        >
                          {st.icon}
                        </div>
                        <span
                          className="text-[11px] sm:text-xs font-medium text-center leading-tight max-w-[80px]"
                          style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                        >
                          {c.title.split("—")[0].trim()}
                        </span>
                      </div>
                      {i < certifications.length - 1 && (
                        <div
                          className="h-[2px] flex-1 min-w-[24px] mx-1"
                          style={{
                            background: c.status === "Acquis"
                              ? "linear-gradient(90deg, rgba(52,211,153,0.4), rgba(52,211,153,0.1))"
                              : "rgba(255,255,255,0.06)",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        {certifications.map((c, i) => {
          const st = statusStyle[c.status] ?? { pill: "", icon: "?" };
          return (
            <article
              key={c.slug}
              className={`card card-hover card-spotlight overflow-hidden animate-in${c.status === "Acquis" ? " card-glow" : ""}`}
              style={{
                animationDelay: `${i * 100}ms`,
                ...(c.status === "Acquis"
                  ? { borderColor: "rgba(52,211,153,0.2)", boxShadow: "0 0 30px rgba(52,211,153,0.06)" }
                  : c.status === "En cours"
                  ? { borderColor: "rgba(251,191,36,0.15)", borderStyle: "dashed" }
                  : { opacity: 0.7 }),
              }}
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

                {c.proofUrl && (
                  <a
                    href={c.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary text-sm w-full mt-1"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    Voir la certification Microsoft
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
