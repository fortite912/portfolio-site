import type { Metadata } from "next";
import { OralSection } from "@/components/oral-section";
import { VeilleSection } from "@/components/veille-section";
import { CcfSection } from "@/components/ccf-section";
import { DocMeta } from "@/components/doc-meta";
import { DocToc, EPREUVES_TOC } from "@/components/doc-toc";

export const metadata: Metadata = {
  title: "Épreuves — Sean Fritsch",
  description:
    "E5 — oral sur portfolio : les six compétences du bloc « Support et mise à disposition de services informatiques » et la veille technologique. E6 — administration des systèmes et des réseaux. BTS SIO SISR, session 2027.",
};

/**
 * Page dédiée aux épreuves professionnelles.
 * Séparée du parcours : le jury y trouve en un clic ce que le
 * référentiel attend, où en sont les réalisations et ce qui reste
 * à produire.
 */
export default function EpreuvesPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-3">
        <p className="heading-section">Épreuves</p>
        <h1 className="heading-lg">Ce que le jury évalue</h1>
        <p className="text-[15px] max-w-2xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Deux épreuves professionnelles s&rsquo;appuient sur ce portfolio. Pour chacune : ce que
          le référentiel attend, les réalisations qui y répondent et ce qui reste à produire.
        </p>

        <DocMeta
          doc="epreuves-professionnelles"
          statut="Session 2027 — dossier en construction"
          extra={[
            { label: "référentiel", value: "BTS SIO — arrêté du 8 juillet 2024 (JO du 10 juillet 2024)" },
            { label: "option", value: "SISR — Solutions d'infrastructure, systèmes et réseaux" },
          ]}
        />
      </header>

      <DocToc sections={EPREUVES_TOC} />

      <OralSection n={1} />

      <div className="section-divider" />

      <VeilleSection n={2} />

      <div className="section-divider" />

      <CcfSection n={3} />
    </div>
  );
}
