"use client";

import { useEffect, useState } from "react";

/**
 * Sommaire de document, collant sous la barre de navigation.
 * Les pages Parcours et Épreuves dépassent plusieurs milliers de pixels
 * et portent des sections numérotées : un jury doit pouvoir atteindre
 * une épreuve précise sans dérouler, et savoir où il en est. La section
 * la plus visible est marquée aria-current.
 *
 * Fonctionne aussi en intégration Google Sites : IntersectionObserver
 * mesure la visibilité par rapport à la fenêtre, à travers l'iframe.
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
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, r] of ratios) {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="Sommaire" className="doc-toc">
      <p
        className="hidden sm:block text-[10px] uppercase shrink-0"
        style={{
          letterSpacing: "0.16em",
          color: "var(--color-muted)",
          fontFamily: "var(--font-mono)",
        }}
      >
        Sommaire
      </p>
      <ol className="m-0 p-0 list-none">
        {sections.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="doc-toc-link inline-flex items-baseline gap-2 text-[13px]"
              style={{ color: "rgba(236,232,225,0.72)" }}
              aria-current={active === s.id ? "true" : undefined}
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
