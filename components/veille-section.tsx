import { veilleE4 } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const IconRadar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <path d="M12 12l6-5" />
  </svg>
);

export function VeilleSection() {
  const {
    epreuve,
    competence,
    status,
    themePrincipal,
    themeSecondaire,
    method,
    sources,
    syntheses,
  } = veilleE4;

  return (
    <AnimateOnScroll>
      <section id="veille" className="space-y-7 scroll-mt-24">
        {/* En-tête */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="heading-section" style={{ margin: 0 }}>
              Épreuve du BTS
            </p>
            <span className="pill pill-yellow" style={{ fontSize: 11 }}>
              ◉ {status}
            </span>
          </div>

          <h2 className="heading-lg">
            <span style={{ color: "var(--color-green)", fontFamily: "var(--font-mono)" }}>
              {epreuve}
            </span>
            {" — "}
            Veille technologique
          </h2>

          <div className="flex flex-wrap gap-1.5">
            <span className="tag-code">{competence}</span>
          </div>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            Une veille n’est pas un exposé : c’est une méthode de travail et son impact concret.
            Voici les thèmes suivis, les sources, et ce qui en ressort.
          </p>
        </div>

        {/* Thèmes */}
        <div className="grid gap-4 md:grid-cols-2">
          <div
            className="card card-hover p-5 space-y-3"
            style={{ borderColor: "rgba(52,211,153,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(52,211,153,0.1)",
                  border: "1px solid rgba(52,211,153,0.22)",
                  color: "var(--color-green)",
                }}
                aria-hidden
              >
                <IconRadar />
              </span>
              <span className="pill pill-green" style={{ fontSize: 10 }}>
                Thème principal
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug">{themePrincipal.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {themePrincipal.why}
            </p>
          </div>

          <div className="card card-hover p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  background: "rgba(96,165,250,0.08)",
                  border: "1px solid rgba(96,165,250,0.18)",
                  color: "var(--color-accent)",
                }}
                aria-hidden
              >
                <IconRadar />
              </span>
              <span className="pill pill-accent" style={{ fontSize: 10 }}>
                Thème secondaire
              </span>
            </div>
            <p className="text-sm font-semibold leading-snug">{themeSecondaire.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {themeSecondaire.why}
            </p>
          </div>
        </div>

        {/* Méthode */}
        <div className="space-y-4">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-muted)" }}
          >
            Méthode
          </h3>
          <ul className="space-y-2">
            {method.map((m) => (
              <li key={m} className="flex gap-2.5 text-sm leading-relaxed">
                <span
                  className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "var(--color-green)", opacity: 0.7 }}
                  aria-hidden
                />
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sources */}
        <div className="space-y-4">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: "var(--color-muted)" }}
          >
            Sources suivies
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {sources.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="card card-hover p-4 space-y-1.5 block"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{s.name}</p>
                  <span
                    className="text-[10px] shrink-0"
                    style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {s.kind}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {s.detail}
                </p>
              </a>
            ))}
          </div>
        </div>

        {/* Synthèses */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-muted)" }}
            >
              Synthèses
            </h3>
            <span
              className="text-[11px]"
              style={{ color: "var(--color-yellow)", fontFamily: "var(--font-mono)" }}
            >
              {syntheses.length} publiée{syntheses.length > 1 ? "s" : ""}
            </span>
          </div>

          {syntheses.length === 0 ? (
            <div
              className="rounded-xl p-5"
              style={{
                background: "rgba(251,191,36,0.04)",
                border: "1px dashed rgba(251,191,36,0.22)",
              }}
            >
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                <span className="font-semibold" style={{ color: "var(--color-yellow)" }}>
                  Premières synthèses à venir.
                </span>{" "}
                Chacune suivra le même format : la source et sa date, ce qui est retenu, et
                surtout ce que cela change concrètement sur une infrastructure.
              </p>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <ul>
                {syntheses.map((s, i) => (
                  <li
                    key={`${s.date}-${s.sujet}`}
                    className="p-4 sm:p-5 space-y-1"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <span
                        className="text-[11px]"
                        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {s.date}
                      </span>
                      <p className="text-sm font-medium">{s.sujet}</p>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {s.impact}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </AnimateOnScroll>
  );
}
