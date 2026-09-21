import { SITE } from "@/lib/site";

type Row = { label: string; value: string; accent?: boolean };

/**
 * En-tête de document technique.
 * Bloc de métadonnées monospace, façon en-tête de spécification :
 * c'est la signature visuelle du portfolio et un rappel de sa promesse
 * — tout ce qui est présenté est daté, versionné et vérifiable.
 */
export function DocMeta({
  doc,
  statut,
  extra = [],
}: {
  doc: string;
  statut: string;
  extra?: Row[];
}) {
  const rows: Row[] = [
    { label: "document", value: doc, accent: true },
    { label: "auteur", value: `${SITE.name} — ${SITE.role}` },
    ...extra,
    { label: "statut", value: statut },
  ];

  return (
    <div
      className="doc-meta"
      style={{
        border: "1px solid var(--color-border)",
        borderLeft: "2px solid var(--color-accent)",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <dl className="m-0">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-4 px-4 py-2"
            style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.045)" }}
          >
            <dt
              className="shrink-0 text-[10px] uppercase"
              style={{
                width: "88px",
                letterSpacing: "0.14em",
                color: "var(--color-muted)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {r.label}
            </dt>
            <dd
              className="m-0 text-[12.5px] leading-snug"
              style={{
                fontFamily: "var(--font-mono)",
                color: r.accent ? "var(--color-accent)" : "rgba(236,232,225,0.82)",
              }}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * Numéro de section, façon plan de document : « 02 — Veille technologique ».
 */
export function SectionNum({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-baseline gap-2.5">
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62em",
          color: "var(--color-accent)",
          letterSpacing: "0.06em",
        }}
      >
        {String(n).padStart(2, "0")}
      </span>
      {children}
    </span>
  );
}
