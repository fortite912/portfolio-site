/**
 * Sommaire de document.
 * La page Parcours depasse 6 000 px et porte cinq sections numerotees :
 * un jury doit pouvoir atteindre une epreuve precise sans derouler.
 * Rendu statiquement, donc utilisable aussi en mode integration.
 */
const SECTIONS = [
  { n: 1, id: "timeline", label: "Expérience & entrepreneuriat" },
  { n: 2, id: "anterieur", label: "Expériences antérieures" },
  { n: 3, id: "ccf", label: "E5 — Administration systèmes et réseaux" },
  { n: 4, id: "veille", label: "E4 — Veille technologique" },
  { n: 5, id: "soveris", label: "Soveris" },
];

export function DocToc() {
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
        {SECTIONS.map((s) => (
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
