/* Corps de la page Parcours.
   Extrait pour etre partage entre la page publique /parcours et la
   route d'integration /embed/parcours utilisee par Google Sites :
   un seul contenu, deux rendus. */
import Link from "next/link";
import { timeline, soveris } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { CcfSection } from "@/components/ccf-section";
import { VeilleSection } from "@/components/veille-section";
import { PriorRoles } from "@/components/prior-roles";
import { CountUp } from "@/components/count-up";
import { DocMeta, SectionNum } from "@/components/doc-meta";

/* ===== Icons ===== */
const IconBriefcase = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconRocket = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
  </svg>
);
const IconGraduation = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10L12 5 2 10l10 5 10-5z" />
    <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
  </svg>
);
const IconGithub = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

/* ===== Style par type d'entrée ===== */
type KindStyle = {
  color: string;
  bg: string;
  border: string;
  pill: string;
  Icon: () => React.ReactElement;
};

const kindStyle: Record<string, KindStyle> = {
  Statut: {
    color: "var(--color-accent2)",
    bg: "rgba(79,138,139,0.1)",
    border: "rgba(79,138,139,0.25)",
    pill: "pill-purple",
    Icon: IconRocket,
  },
  Expérience: {
    color: "var(--color-accent)",
    bg: "rgba(226,105,60,0.1)",
    border: "rgba(226,105,60,0.25)",
    pill: "pill-accent",
    Icon: IconBriefcase,
  },
  Formation: {
    color: "var(--color-cyan)",
    bg: "rgba(107,130,153,0.1)",
    border: "rgba(107,130,153,0.25)",
    pill: "pill-muted",
    Icon: IconGraduation,
  },
};

const KEY_FACTS = [
  { value: "5", label: "semaines à la DISI", sublabel: "CentraleSupélec" },
  { value: "122", label: "postes masterisés", sublabel: "concours d’entrée" },
  { value: "92%", label: "précision Soveris", sublabel: "banc de 50 cas" },
];

export function ParcoursContent() {
  return (
    <div className="space-y-14">
      {/* ===== Header ===== */}
      <header className="relative space-y-6">
        {/* Bannière décorative : fond en fondu vers le bas */}
        <div
          className="absolute inset-x-0 -top-12 h-[300px] pointer-events-none hidden sm:block"
          style={{
            backgroundImage: "url(/media/parcours-banner.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            opacity: 0.55,
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)",
          }}
          aria-hidden
        />

        <div className="relative space-y-3">
          <p className="heading-section">Parcours</p>
          <h1 className="heading-lg">
            <SectionNum n={1}>Expérience &amp; entrepreneuriat</SectionNum>
          </h1>
          <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Du support de proximité en environnement réel au prototype développé sous statut
            étudiant-entrepreneur. Les faits, les dates et les chiffres — rien d’autre.
          </p>

          <DocMeta
            doc="parcours-professionnel"
            statut="En cours de constitution — BTS SIO SISR 2e année"
            extra={[
              { label: "épreuves", value: "E4 (veille) · E5 (administration SR)" },
              { label: "période", value: "2025 — 2027" },
            ]}
          />
        </div>

        <div className="relative grid grid-cols-3 gap-3 sm:gap-4">
          {KEY_FACTS.map((f, i) => (
            <AnimateOnScroll key={f.label} delay={i * 80}>
              <div className="card card-hover p-4 sm:p-5 text-center space-y-1">
                <div className="stat-number">
                  <CountUp value={f.value} />
                </div>
                <p className="text-xs sm:text-sm font-medium leading-tight">{f.label}</p>
                <p
                  className="text-[10px] sm:text-[11px] leading-tight"
                  style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {f.sublabel}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </header>

      {/* ===== Timeline ===== */}
      <section className="space-y-5">
        {timeline.map((entry, i) => {
          const st = kindStyle[entry.kind] ?? kindStyle["Expérience"];
          const isLast = i === timeline.length - 1;

          return (
            <AnimateOnScroll key={entry.slug} delay={i * 90}>
              <div className="relative pl-11 sm:pl-14">
                {/* Rail */}
                {!isLast && (
                  <span
                    className="absolute left-[15px] sm:left-[19px] top-11 bottom-[-20px] w-px"
                    style={{
                      background: `linear-gradient(to bottom, ${st.border}, rgba(255,255,255,0.03))`,
                    }}
                    aria-hidden
                  />
                )}
                {/* Dot */}
                <span
                  className="absolute left-0 top-1.5 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl"
                  style={{ background: st.bg, border: `1px solid ${st.border}`, color: st.color }}
                  aria-hidden
                >
                  <st.Icon />
                </span>

                <article
                  className="card card-hover card-spotlight p-5 sm:p-6 space-y-4"
                  style={
                    entry.upcoming
                      ? { borderStyle: "dashed", borderColor: "rgba(217,164,65,0.22)" }
                      : undefined
                  }
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>
                        {entry.kind}
                      </span>
                      {entry.upcoming && (
                        <span className="pill pill-yellow" style={{ fontSize: 11 }}>
                          ○ À venir
                        </span>
                      )}
                      {entry.current && (
                        <span
                          className="pill pill-green inline-flex items-center gap-1.5"
                          style={{ fontSize: 11 }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full badge-live"
                            style={{
                              background: "var(--color-green)",
                              boxShadow: "0 0 6px var(--color-green)",
                            }}
                          />
                          En cours
                        </span>
                      )}
                      <span
                        className="text-[11px] w-full sm:w-auto sm:ml-auto"
                        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {entry.period}
                      </span>
                    </div>

                    <h2 className="text-[17px] font-semibold leading-snug">{entry.title}</h2>
                    <p className="text-sm font-medium" style={{ color: st.color }}>
                      {entry.org}
                      {entry.orgNote && (
                        <span className="font-normal" style={{ color: "var(--color-muted)" }}>
                          {" · "}
                          {entry.orgNote}
                        </span>
                      )}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {entry.summary}
                  </p>

                  <ul className="space-y-2">
                    {entry.highlights.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm leading-relaxed">
                        <span
                          className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: st.color, opacity: 0.7 }}
                          aria-hidden
                        />
                        <span style={{ color: "rgba(255,255,255,0.75)" }}>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {entry.stack && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {entry.stack.map((s) => (
                        <span key={s} className="tag-code">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  {entry.note && (
                    <p
                      className="text-xs leading-relaxed"
                      style={{
                        color: "var(--color-muted)",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        paddingTop: 12,
                      }}
                    >
                      {entry.note}
                    </p>
                  )}

                  {entry.slug === "bts-sio-sisr" && (
                    <Link className="btn text-sm" href="/certifications">
                      Voir les certifications
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  )}
                </article>
              </div>
            </AnimateOnScroll>
          );
        })}
      </section>

      <div className="section-divider" />

      <PriorRoles />

      <div className="section-divider" />

      <CcfSection />

      <div className="section-divider" />

      <VeilleSection />

      <div className="section-divider" />

      {/* ===== Soveris ===== */}
      <AnimateOnScroll>
        <section className="card-gradient-border p-6 md:p-10 space-y-7 relative overflow-hidden noise">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 20% 0%, rgba(79,138,139,0.08), transparent 65%)",
            }}
          />

          <div className="relative space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="heading-section" style={{ margin: 0 }}>
                Projet entrepreneurial
              </p>
              <span className="pill pill-yellow" style={{ fontSize: 11 }}>
                Prototype
              </span>
            </div>
            <h2 className="heading-lg">
              <SectionNum n={5}>{soveris.name}</SectionNum>
            </h2>
            <p className="text-[15px] font-medium" style={{ color: "var(--color-accent2)" }}>
              {soveris.tagline}
            </p>
            <p
              className="text-sm leading-relaxed max-w-2xl"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {soveris.description}
            </p>
          </div>

          {/* Métriques */}
          <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-3">
            {soveris.metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl p-4 text-center space-y-1 transition-colors duration-300 hover:border-[rgba(79,138,139,0.25)]"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  className="text-xl sm:text-2xl font-bold"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                >
                  {m.value}
                </p>
                <p className="text-[11px] leading-tight" style={{ color: "var(--color-muted)" }}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative flex flex-wrap gap-1.5">
            {soveris.stack.map((s) => (
              <span key={s} className="tag-code">
                {s}
              </span>
            ))}
          </div>

          {/* Limites assumées */}
          <div
            className="relative rounded-xl p-5 space-y-2.5"
            style={{
              background: "rgba(217,164,65,0.04)",
              border: "1px solid rgba(217,164,65,0.15)",
            }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-yellow)" }}
            >
              Ce que Soveris n’est pas
            </p>
            <ul className="space-y-1.5">
              {soveris.caveats.map((c) => (
                <li key={c} className="flex gap-2.5 text-[13px] leading-relaxed">
                  <span
                    className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "var(--color-yellow)", opacity: 0.6 }}
                    aria-hidden
                  />
                  <span style={{ color: "rgba(255,255,255,0.65)" }}>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {soveris.repo && (
            <div className="relative">
              <a className="btn btn-primary" href={soveris.repo} target="_blank" rel="noreferrer">
                <IconGithub />
                Voir le code sur GitHub
              </a>
            </div>
          )}
        </section>
      </AnimateOnScroll>

      {/* ===== CTA ===== */}
      <AnimateOnScroll>
        <section className="card p-6 md:p-8 text-center space-y-4">
          <h2 className="text-lg font-semibold">Une question sur mon parcours ?</h2>
          <p
            className="text-sm max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Les labs qui accompagnent cette formation sont documentés avec leurs preuves de
            validation.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-1">
            <Link className="btn btn-primary" href="/contact">
              Me contacter
            </Link>
            <Link className="btn" href="/projects">
              Voir les projets
            </Link>
          </div>
        </section>
      </AnimateOnScroll>
    </div>
  );
}
