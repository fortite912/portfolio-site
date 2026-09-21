import { priorRoles } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionNum } from "@/components/doc-meta";

/**
 * Expériences antérieures au BTS, en tableau compact.
 * Format volontairement dense : elles situent une trajectoire, alors que
 * la timeline au-dessus porte les réalisations évaluables.
 */
export function PriorRoles() {
  const itCount = priorRoles.filter((r) => r.it).length;

  return (
    <AnimateOnScroll>
      <section id="anterieur" className="space-y-6 scroll-mt-24">
        <div className="space-y-3">
          <p className="heading-section">Avant le BTS</p>
          <h2 className="heading-lg">
            <SectionNum n={2}>Expériences antérieures</SectionNum>
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            Sept périodes en entreprise depuis la classe de 3ᵉ, dont {itCount} en environnement
            technique. Elles expliquent d’où vient la méthode : du terrain, pas de la théorie.
          </p>
        </div>

        <div className="card overflow-hidden">
          <ul>
            {priorRoles.map((r, i) => (
              <li
                key={`${r.period}-${r.org}`}
                className="grid gap-x-5 gap-y-1.5 px-4 py-4 sm:px-5 sm:py-4 sm:grid-cols-[150px_1fr]"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.045)" }}
              >
                <div className="flex sm:flex-col sm:gap-1 items-baseline gap-2">
                  <span
                    className="text-[11px] whitespace-nowrap"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {r.period}
                  </span>
                  <span
                    className="text-[10px] uppercase"
                    style={{
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {r.kind}
                  </span>
                </div>

                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <p className="text-sm font-semibold leading-snug">{r.role}</p>
                    {r.it && (
                      <span
                        className="text-[10px]"
                        style={{ color: "var(--color-accent2)", fontFamily: "var(--font-mono)" }}
                      >
                        · IT
                      </span>
                    )}
                  </div>
                  <p className="text-[13px]" style={{ color: "rgba(236,232,225,0.72)" }}>
                    {r.org}
                    <span style={{ color: "var(--color-muted)" }}> — {r.place}</span>
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {r.detail}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
