import Link from "next/link";
import { ccfE5 } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

const IconClipboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
  </svg>
);

export function CcfSection() {
  const { code, title, option, coefficient, evaluation, status, intro, competences, deliverables, notes } = ccfE5;

  return (
    <AnimateOnScroll>
      <section id="ccf" className="relative space-y-7 scroll-mt-24">
        {/* Fond décoratif : grille isométrique */}
        <div
          className="absolute inset-x-0 -top-8 h-[420px] pointer-events-none hidden md:block"
          style={{
            backgroundImage: "url(/media/cyber-grid.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.4,
            maskImage:
              "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 72%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.9), transparent 72%)",
          }}
          aria-hidden
        />

        {/* En-tête */}
        <div className="relative space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="heading-section" style={{ margin: 0 }}>
              Épreuve du BTS
            </p>
            <span className="pill pill-yellow" style={{ fontSize: 11 }}>
              ○ {status}
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3">
            <h2 className="heading-lg">
              <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>{code}</span>
              {" — "}
              {title}
            </h2>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <span className="tag-code">{option}</span>
            <span className="tag-code">Coefficient {coefficient}</span>
            <span className="tag-code">{evaluation}</span>
          </div>

          <p className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--color-muted)" }}>
            {intro}
          </p>
        </div>

        {/* Bandeau "à venir" */}
        <div
          className="relative rounded-xl p-4 flex gap-3 items-start"
          style={{
            background: "rgba(251,191,36,0.05)",
            border: "1px dashed rgba(251,191,36,0.25)",
          }}
        >
          <span
            className="mt-0.5 shrink-0"
            style={{ color: "var(--color-yellow)" }}
            aria-hidden
          >
            <IconClipboard />
          </span>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            <span className="font-semibold" style={{ color: "var(--color-yellow)" }}>
              Section à venir.
            </span>{" "}
            Les réalisations professionnelles et leurs livrables seront publiés ici au fur et à
            mesure de leur production. Rien n’est encore présenté comme terminé.
          </p>
        </div>

        {/* Compétences du bloc */}
        <div className="relative space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
            Compétences évaluées
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {competences.map((c, i) => (
              <div
                key={c.title}
                className="card card-hover p-5 space-y-3"
                style={{ borderColor: "rgba(96,165,250,0.12)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(96,165,250,0.08)",
                    border: "1px solid rgba(96,165,250,0.18)",
                  }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug">{c.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {c.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Livrables attendus */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
              Livrables attendus
            </h3>
            <span
              className="text-[11px]"
              style={{ color: "var(--color-yellow)", fontFamily: "var(--font-mono)" }}
            >
              0 / {deliverables.length} produits
            </span>
          </div>

          <div className="card overflow-hidden">
            <ul>
              {deliverables.map((d, i) => (
                <li
                  key={d.label}
                  className="flex gap-3.5 items-start p-4 sm:p-5"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <span
                    className="mt-0.5 w-5 h-5 rounded-md shrink-0 flex items-center justify-center"
                    style={{
                      border: `1px ${d.done ? "solid" : "dashed"} ${
                        d.done ? "rgba(52,211,153,0.5)" : "rgba(251,191,36,0.35)"
                      }`,
                      background: d.done ? "rgba(52,211,153,0.12)" : "transparent",
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
                    className="ml-auto shrink-0 pill pill-yellow self-center hidden sm:inline-flex"
                    style={{ fontSize: 10 }}
                  >
                    À produire
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          {notes.map((n) => (
            <p key={n} className="flex gap-2.5 text-[13px] leading-relaxed">
              <span
                className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-accent)", opacity: 0.6 }}
                aria-hidden
              />
              <span style={{ color: "var(--color-muted)" }}>{n}</span>
            </p>
          ))}
        </div>

        <Link className="btn text-sm" href="/projects">
          Voir les labs qui alimentent l’épreuve
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </section>
    </AnimateOnScroll>
  );
}
