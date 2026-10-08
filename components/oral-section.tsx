import Link from "next/link";
import { oralE5 } from "@/lib/experience";
import type { Coverage, Realisation, RealisationContext } from "@/lib/types";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionNum } from "@/components/doc-meta";

const IconUsers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

/* Rendu d'un état de couverture : couleur, pastille et libellé. */
const COVERAGE: Record<
  Coverage,
  { label: string; pill: string; color: string; border: string; mark: string }
> = {
  couverte: {
    label: "Réalisations identifiées",
    pill: "pill-green",
    color: "var(--color-green)",
    border: "rgba(127,163,127,0.22)",
    mark: "✓",
  },
  partielle: {
    label: "Partiellement couverte",
    pill: "pill-yellow",
    color: "var(--color-yellow)",
    border: "rgba(217,164,65,0.25)",
    mark: "◐",
  },
  "a-couvrir": {
    label: "À couvrir",
    pill: "pill-accent",
    color: "var(--color-accent)",
    border: "rgba(226,105,60,0.3)",
    mark: "○",
  },
};

const CONTEXT_PILL: Record<RealisationContext, string> = {
  Stage: "pill-accent",
  Formation: "pill-muted",
  Entrepreneuriat: "pill-purple",
};

function RealisationLink({ r }: { r: Realisation }) {
  const style = { color: "rgba(255,255,255,0.78)" };
  if (!r.href) return <span style={style}>{r.label}</span>;
  if (r.href.startsWith("http")) {
    return (
      <a className="link-underline" style={style} href={r.href} target="_blank" rel="noreferrer">
        {r.label}
      </a>
    );
  }
  return (
    <Link className="link-underline" style={style} href={r.href}>
      {r.label}
    </Link>
  );
}

/**
 * Épreuve E5 : l'oral sur portfolio.
 * Le cœur de la page Épreuves : pour chacune des six compétences du
 * bloc 1, les réalisations qui la mobilisent et l'état de couverture.
 * n : numéro dans le sommaire de la page ; absent sur la page E5 seule.
 */
export function OralSection({ n }: { n?: number } = {}) {
  const { code, title, coefficient, evaluation, status, intro, phases, jury, competences, dossier, notes } =
    oralE5;

  const count = (c: Coverage) => competences.filter((x) => x.coverage === c).length;
  const ready = dossier.filter((d) => d.done).length;

  return (
    <AnimateOnScroll>
      <section id="oral" className="space-y-8 scroll-mt-32">
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
            <SectionNum n={n}>
              <span style={{ color: "var(--color-accent)" }}>{code}</span>
              {" — "}
              {title}
            </SectionNum>
          </h2>

          <div className="flex flex-wrap gap-1.5">
            <span className="tag-code">Bloc 1</span>
            <span className="tag-code">Coefficient {coefficient}</span>
            <span className="tag-code">{evaluation}</span>
          </div>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            {intro}
          </p>
        </div>

        {/* Déroulement */}
        <div className="grid gap-3 sm:grid-cols-3">
          {phases.map((p) => (
            <div key={p.label} className="card p-5 space-y-1.5">
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
              >
                {p.duration}
              </p>
              <p className="text-sm font-semibold">{p.label}</p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {p.detail}
              </p>
            </div>
          ))}
          <div
            className="card p-5 space-y-2"
            style={{ borderStyle: "dashed", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <p
              className="inline-flex items-center gap-2 text-[10px] uppercase"
              style={{
                letterSpacing: "0.14em",
                color: "var(--color-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <IconUsers />
              Jury
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
              {jury}
            </p>
          </div>
        </div>

        {/* Les six compétences */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-muted)" }}
            >
              Les six compétences du bloc
            </h3>
            <p
              className="text-[11px]"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
            >
              <span style={{ color: "var(--color-green)" }}>{count("couverte")} couvertes</span>
              {" · "}
              <span style={{ color: "var(--color-yellow)" }}>{count("partielle")} partielle</span>
              {" · "}
              <span style={{ color: "var(--color-accent)" }}>{count("a-couvrir")} à couvrir</span>
            </p>
          </div>

          {/* Accès direct à une compétence pendant l'entretien */}
          <div className="flex flex-wrap gap-1.5" aria-label="Aller à une compétence">
            {competences.map((c) => (
              <a key={c.code} href={`#${c.code.toLowerCase()}`} className="tag-code">
                {c.code} · {c.title.split(" ").slice(0, 3).join(" ")}
                {c.title.split(" ").length > 3 ? "…" : ""}
              </a>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {competences.map((c) => {
              const cov = COVERAGE[c.coverage];
              return (
                <article
                  key={c.code}
                  id={c.code.toLowerCase()}
                  className="card card-hover p-5 space-y-3 scroll-mt-32"
                  style={{ borderColor: cov.border }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-xs font-bold"
                      style={{ color: cov.color, fontFamily: "var(--font-mono)" }}
                    >
                      {c.code}
                    </span>
                    <span className={`pill ${cov.pill}`} style={{ fontSize: 10 }}>
                      {cov.mark} {cov.label}
                    </span>
                  </div>

                  <p className="text-sm font-semibold leading-snug">{c.title}</p>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {c.detail}
                  </p>

                  {c.realisations.length > 0 && (
                    <ul
                      className="space-y-2"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 12 }}
                    >
                      {c.realisations.map((r) => (
                        <li key={r.label} className="flex gap-2.5 items-start text-[13px] leading-snug">
                          <span
                            className={`pill ${CONTEXT_PILL[r.context]} shrink-0`}
                            style={{ fontSize: 9, padding: "2px 7px", marginTop: 1 }}
                          >
                            {r.context}
                          </span>
                          <RealisationLink r={r} />
                        </li>
                      ))}
                    </ul>
                  )}

                  {c.note && (
                    <p className="text-xs leading-relaxed" style={{ color: cov.color }}>
                      {c.note}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        {/* Dossier numérique */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-muted)" }}
            >
              Dossier numérique
            </h3>
            <span
              className="text-[11px]"
              style={{ color: "var(--color-yellow)", fontFamily: "var(--font-mono)" }}
            >
              {ready} / {dossier.length} prêts
            </span>
          </div>

          <div className="card overflow-hidden">
            <ul>
              {dossier.map((d, i) => (
                <li
                  key={d.label}
                  className="flex gap-3.5 items-start p-4 sm:p-5"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)" }}
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center"
                    style={{
                      border: `1px ${d.done ? "solid" : "dashed"} ${
                        d.done ? "rgba(127,163,127,0.5)" : "rgba(217,164,65,0.35)"
                      }`,
                      background: d.done ? "rgba(127,163,127,0.12)" : "transparent",
                      color: d.done ? "var(--color-green)" : "var(--color-yellow)",
                      fontSize: 11,
                      fontFamily: "var(--font-mono)",
                    }}
                    aria-hidden
                  >
                    {d.done ? "✓" : "○"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug">{d.label}</p>
                    <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--color-muted)" }}>
                      {d.detail}
                    </p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 pill ${d.done ? "pill-green" : "pill-yellow"} self-center hidden sm:inline-flex`}
                    style={{ fontSize: 10 }}
                  >
                    {d.done ? "Prêt" : "À produire"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          {notes.map((t) => (
            <p key={t} className="flex gap-2.5 text-[13px] leading-relaxed">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)", opacity: 0.6 }}
                aria-hidden
              />
              <span style={{ color: "var(--color-muted)" }}>{t}</span>
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary text-sm" href="/parcours">
            Parcours de professionnalisation
          </Link>
          <Link className="btn text-sm" href="/projects">
            Voir les labs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
