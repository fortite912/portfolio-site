import Link from "next/link";
import { soveris } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const IconBriefcase = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const IconRocket = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
  </svg>
);

const CARDS = [
  {
    Icon: IconBriefcase,
    kind: "Expérience",
    title: "Stage à la DISI de CentraleSupélec",
    period: "Mai — juin 2026 · 5 semaines",
    body:
      "Support utilisateur sur Request Tracker, interventions de proximité, déploiement MFA, diagnostic VLAN et masterisation de 122 postes pour les concours d’entrée.",
    tags: ["Request Tracker", "MFA", "VLAN", "Masterisation"],
    color: "var(--color-accent)",
    bg: "rgba(226,105,60,0.08)",
    border: "rgba(226,105,60,0.18)",
    pill: "pill-accent",
  },
  {
    Icon: IconRocket,
    kind: "Entrepreneuriat",
    title: "Étudiant-entrepreneur — projet Soveris",
    period: "Depuis septembre 2026 · en cours",
    body:
      "Statut SNEE obtenu auprès du Pépite Paris Ouest Nord pour développer Soveris, un prototype de tri des demandes de support N1 qui tourne entièrement en local.",
    tags: ["Python", "100% local", "92% de précision", "19/19 tests"],
    color: "var(--color-accent2)",
    bg: "rgba(79,138,139,0.08)",
    border: "rgba(79,138,139,0.18)",
    pill: "pill-purple",
  },
];

export function ParcoursTeaser() {
  return (
    <section className="space-y-8">
      <AnimateOnScroll>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="heading-section">Parcours</p>
            <h2 className="heading-lg mt-2">Terrain &amp; entrepreneuriat</h2>
          </div>
          <Link className="btn text-sm" href="/parcours">
            Parcours complet
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </AnimateOnScroll>

      <div className="grid gap-5 md:grid-cols-2">
        {CARDS.map((c, i) => (
          <AnimateOnScroll key={c.title} delay={i * 100}>
            <Link
              href="/parcours"
              className="card card-hover card-spotlight p-6 space-y-4 block h-full"
              style={{ borderColor: c.border }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.color }}
                >
                  <c.Icon />
                </div>
                <div className="min-w-0">
                  <span className={`pill ${c.pill}`} style={{ fontSize: 10 }}>
                    {c.kind}
                  </span>
                  <p
                    className="text-[11px] mt-1.5"
                    style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {c.period}
                  </p>
                </div>
              </div>

              <h3 className="font-semibold text-[15px] leading-snug">{c.title}</h3>

              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {c.body}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {c.tags.map((t) => (
                  <span key={t} className="tag-code">
                    {t}
                  </span>
                ))}
              </div>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>

      <AnimateOnScroll delay={200}>
        <div
          className="card p-5 flex flex-wrap items-center justify-between gap-4"
          style={{ borderColor: "rgba(79,138,139,0.14)" }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-2 h-2 rounded-full badge-live shrink-0"
              style={{ background: "var(--color-green)", boxShadow: "0 0 6px var(--color-green)" }}
            />
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              <span className="font-semibold" style={{ color: "var(--color-text)" }}>
                {soveris.name}
              </span>{" "}
              — {soveris.tagline}, en open source.
            </p>
          </div>
          {soveris.repo && (
            <a className="btn text-sm shrink-0" href={soveris.repo} target="_blank" rel="noreferrer">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Code source
            </a>
          )}
        </div>
      </AnimateOnScroll>
    </section>
  );
}
