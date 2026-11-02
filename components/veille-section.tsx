import { veilleE5 } from "@/lib/experience";
import { getLastRun, getVeilleFeed, COLLECTOR_URL } from "@/lib/veille-feed";
import { veilleSteps } from "@/lib/veille-method";
import type { VeilleThemeSpec } from "@/lib/types";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionNum } from "@/components/doc-meta";
import { VeilleSteps } from "@/components/veille-steps";
import { VeilleSources } from "@/components/veille-sources";
import { VeilleCollecte } from "@/components/veille-collecte";
import { VeilleJournal } from "@/components/veille-journal";

const IconRadar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.2" fill="currentColor" />
    <path d="M12 12l6-5" />
  </svg>
);

function ThemeCard({
  theme,
  label,
  color,
  rgb,
  pill,
}: {
  theme: VeilleThemeSpec;
  label: string;
  color: string;
  rgb: string;
  pill: string;
}) {
  return (
    <div className="card card-hover p-5 space-y-3" style={{ borderColor: `rgba(${rgb},0.2)` }}>
      <div className="flex items-center gap-2">
        <span
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.22)`, color }}
          aria-hidden
        >
          <IconRadar />
        </span>
        <span className={`pill ${pill}`} style={{ fontSize: 10 }}>
          {label}
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug">{theme.title}</p>
      <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
        {theme.why}
      </p>
      <ul className="space-y-1.5 pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10 }}>
        {theme.axes.map((a) => (
          <li key={a} className="flex gap-2 text-xs leading-relaxed">
            <span
              className="mt-[6px] w-1 h-1 rounded-full shrink-0"
              style={{ background: color }}
              aria-hidden
            />
            <span style={{ color: "rgba(236,232,225,0.75)" }}>{a}</span>
          </li>
        ))}
      </ul>
      {theme.exclu && (
        <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Hors périmètre : {theme.exclu}
        </p>
      )}
    </div>
  );
}

/**
 * Veille technologique (E5, compétence « Organiser son développement
 * professionnel »). Ordre : thèmes, méthode en 10 étapes, sources,
 * collecte automatique, puis le travail personnel (revues, synthèses).
 * n : numéro dans le sommaire de la page ; absent sur une page seule.
 */
export async function VeilleSection({ n }: { n?: number } = {}) {
  const { epreuve, competence, status, themePrincipal, themeSecondaire } = veilleE5;
  const [feed, lastRun] = await Promise.all([getVeilleFeed(), getLastRun()]);
  const steps = veilleSteps(feed, lastRun);

  return (
    <AnimateOnScroll>
      <section id="veille" className="space-y-9 scroll-mt-32">
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
              <span style={{ color: "var(--color-green)" }}>{epreuve}</span>
              {" — "}
              Veille technologique
            </SectionNum>
          </h2>

          <div className="flex flex-wrap gap-1.5">
            <span className="tag-code">Compétence C6 — {competence}</span>
          </div>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            Une veille n’est pas un exposé : c’est une méthode de travail tenue dans la durée. Voici
            les thèmes suivis, la méthode, les sources, ce que la collecte repère et ce que j’en
            retiens.
          </p>
        </div>

        {/* Thèmes et périmètre */}
        <div id="veille-themes" className="grid gap-4 md:grid-cols-2 scroll-mt-32">
          <ThemeCard
            theme={themePrincipal}
            label="Thème principal"
            color="var(--color-green)"
            rgb="127,163,127"
            pill="pill-green"
          />
          <ThemeCard
            theme={themeSecondaire}
            label="Thème secondaire"
            color="var(--color-accent)"
            rgb="226,105,60"
            pill="pill-accent"
          />
        </div>

        <VeilleSteps steps={steps} />

        <VeilleSources feed={feed} />

        <VeilleCollecte feed={feed} lastRun={lastRun} />

        <VeilleJournal />

        {/* Suivre et vérifier */}
        <div className="flex flex-wrap gap-2">
          <a className="btn text-sm" href="/veille/rss.xml">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M4 11a9 9 0 0 1 9 9" />
              <path d="M4 4a16 16 0 0 1 16 16" />
              <circle cx="5" cy="19" r="1" />
            </svg>
            Flux RSS de ma veille
          </a>
          <a className="btn text-sm" href="/veille/sources.opml">
            Sources (OPML)
          </a>
          <a className="btn text-sm" href={COLLECTOR_URL} target="_blank" rel="noreferrer">
            Code du collecteur ↗
          </a>
        </div>
      </section>
    </AnimateOnScroll>
  );
}
