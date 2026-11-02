import type { Metadata } from "next";
import { OralSection } from "@/components/oral-section";

/**
 * Sous-page E5 du Google Site (menu Projets) : l'oral sur portfolio.
 * La veille technologique, qui fait partie de cette épreuve (compétence
 * C6), a sa propre page sur le Google Site : un renvoi suffit ici.
 */
export const metadata: Metadata = {
  title: "E5 — Support et mise à disposition de services informatiques — Sean Fritsch",
  robots: { index: false, follow: false },
};

const VEILLE_GOOGLE_SITE =
  "https://sites.google.com/view/portfolio-sean-fritsch-sisr/veille-technologique";

export default function EmbedE5Page() {
  return (
    <div className="space-y-10">
      <OralSection />
      <a
        href={VEILLE_GOOGLE_SITE}
        target="_blank"
        rel="noreferrer"
        className="card card-hover p-5 block space-y-1"
        style={{ borderColor: "rgba(127,163,127,0.22)" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-green)" }}>
          Fait partie de cette épreuve
        </p>
        <p className="text-[15px] font-semibold">Ma veille technologique →</p>
        <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Mes deux sujets et pourquoi je les ai choisis, ma méthode en 10 étapes et mon planning
          jusqu’à l’épreuve : page « Veille technologique » du menu.
        </p>
      </a>
    </div>
  );
}
