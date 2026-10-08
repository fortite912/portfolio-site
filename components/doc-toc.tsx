/**
 * Sommaire de document.
 * Les pages Parcours et Épreuves dépassent plusieurs milliers de pixels
 * et portent des sections numérotées : un jury doit pouvoir atteindre
 * une épreuve précise sans dérouler. Rendu statiquement, donc utilisable
 * aussi en mode intégration.
 */
export type TocSection = { n: number; id: string; label: string };

export const PARCOURS_TOC: TocSection[] = [
  { n: 1, id: "timeline", label: "Expérience & entrepreneuriat" },
  { n: 2, id: "anterieur", label: "Expériences antérieures" },
  { n: 3, id: "soveris", label: "Soveris" },
];

export const EPREUVES_TOC: TocSection[] = [
  { n: 1, id: "oral", label: "E5 — Oral sur portfolio" },
  { n: 2, id: "veille", label: "E5 — Veille technologique" },
  { n: 3, id: "ccf", label: "E6 — Administration systèmes et réseaux" },
];

export function DocToc({ sections }: { sections: TocSection[] }) {
  return (
    <nav aria-label="Sommaire" className="doc-toc">
      <p
        className="text-[10px] uppercase mb-2.5"
        style={{
          letterSpacing: "0.16em",
          color: "var(--color-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Sommaire
      </p>
      <ol className="flex flex-wrap gap-x-5 gap-y-2 m-0 p-0 list-none">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="doc-toc-link inline-flex items-baseline gap-2 text-[13px]"
              style={{ color: "rgba(236,232,225,0.72)" }}
            >
              <span
                style={{
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                }}
              >
                {String(s.n).padStart(2, "0")}
              </span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
