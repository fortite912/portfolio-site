import { SITE } from "@/lib/site";

/**
 * En-tête de l'accueil du Google Site.
 * Remplace la bannière native de Google Sites depuis que l'accueil est
 * une intégration pleine page : nom, formation et statut de stage, ce
 * dernier lu dans lib/stage.ts via SITE.availability.
 */
export function EmbedHero() {
  const { label, dateRange } = SITE.availability;

  return (
    <header className="space-y-5 pt-2">
      <span
        className="availability-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium"
        style={{ color: "var(--color-green)", fontFamily: "var(--font-mono)" }}
      >
        <span
          className="w-2 h-2 rounded-full badge-live"
          style={{ background: "var(--color-green)", boxShadow: "0 0 6px var(--color-green)" }}
        />
        {label} — {dateRange}
      </span>

      <h1 className="heading-xl">{SITE.name}</h1>

      <p
        className="text-[13px]"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
      >
        {SITE.role} · Pôle Supérieur Montalembert, Courbevoie
      </p>
    </header>
  );
}
