import { getVeilleFeed, THEME_LABELS, WORKFLOW_URL, type VeilleTheme } from "@/lib/veille-feed";

const SHOWN = 8;

const THEME_STYLE: Record<VeilleTheme, { color: string; bg: string; border: string }> = {
  "ia-support": {
    color: "var(--color-green)",
    bg: "rgba(127,163,127,0.08)",
    border: "rgba(127,163,127,0.22)",
  },
  acces: {
    color: "var(--color-accent)",
    bg: "rgba(226,105,60,0.07)",
    border: "rgba(226,105,60,0.2)",
  },
  alerte: {
    color: "var(--color-yellow)",
    bg: "rgba(217,164,65,0.07)",
    border: "rgba(217,164,65,0.22)",
  },
};

const day = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "Europe/Paris",
});
const stamp = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

/**
 * Derniers articles reperes par la collecte automatique.
 * Distincts des syntheses : ce bloc montre la reception automatisee de
 * l'information, les syntheses montrent ce qui en a ete tire.
 */
export async function VeilleFeed() {
  const feed = await getVeilleFeed();
  const items = feed.items.slice(0, SHOWN);
  const activeSources = new Set(
    feed.sources.filter((s) => s.ok).map((s) => s.name),
  ).size;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-muted)" }}
        >
          Collecte automatique
        </h3>
        <a
          href={WORKFLOW_URL}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] doc-toc-link"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
        >
          historique des exécutions →
        </a>
      </div>

      <p
        className="text-[11px] leading-relaxed"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
      >
        {feed.items.length} article{feed.items.length > 1 ? "s" : ""} retenu
        {feed.items.length > 1 ? "s" : ""} sur {feed.windowDays} jours · {activeSources} sources ·
        dernière collecte le {stamp.format(new Date(feed.collectedAt))} · GitHub Actions, chaque
        matin
      </p>

      {items.length === 0 ? (
        <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          Aucun article retenu sur la période.
        </p>
      ) : (
        <div className="card overflow-hidden">
          <ul>
            {items.map((it, i) => (
              <li
                key={it.id}
                className="grid gap-x-4 gap-y-1 px-4 py-3.5 sm:grid-cols-[52px_1fr]"
                style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.045)" }}
              >
                <span
                  className="text-[11px] pt-0.5"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                >
                  {day.format(new Date(it.date))}
                </span>
                <div className="min-w-0 space-y-1.5">
                  <a
                    href={it.link}
                    target="_blank"
                    rel="noreferrer"
                    className="doc-toc-link text-[13.5px] font-medium leading-snug block"
                    style={{ color: "rgba(236,232,225,0.9)" }}
                  >
                    {it.title}
                  </a>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span
                      className="text-[10.5px]"
                      style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {it.source} · {it.kind}
                    </span>
                    {it.themes.map((t) => {
                      const st = THEME_STYLE[t];
                      return (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-px rounded"
                          style={{
                            color: st.color,
                            background: st.bg,
                            border: `1px solid ${st.border}`,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {THEME_LABELS[t]}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
        Articles repérés automatiquement selon les deux thèmes suivis. Seuls ceux que j’ai lus et
        analysés deviennent une synthèse, plus bas.
      </p>
    </div>
  );
}
