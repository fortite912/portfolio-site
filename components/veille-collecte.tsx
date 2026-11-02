import {
  THEME_LABELS,
  WORKFLOW_URL,
  type LastRun,
  type VeilleFeed,
  type VeilleItem,
  type VeilleTheme,
} from "@/lib/veille-feed";

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
  outils: {
    color: "var(--color-cyan)",
    bg: "rgba(114,138,161,0.08)",
    border: "rgba(114,138,161,0.24)",
  },
  alerte: {
    color: "var(--color-yellow)",
    bg: "rgba(217,164,65,0.07)",
    border: "rgba(217,164,65,0.22)",
  },
};

const THEME_ORDER: VeilleTheme[] = ["ia-support", "acces", "outils", "alerte"];

const tz = { timeZone: "Europe/Paris" } as const;
const day = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", ...tz });
const dayYear = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  ...tz,
});
const stamp = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  ...tz,
});
const monthFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", ...tz });

function ThemeBadge({ t }: { t: VeilleTheme }) {
  const st = THEME_STYLE[t] ?? THEME_STYLE.alerte;
  return (
    <span
      className="text-[10px] px-1.5 py-px rounded"
      style={{
        color: st.color,
        background: st.bg,
        border: `1px solid ${st.border}`,
        fontFamily: "var(--font-mono)",
      }}
    >
      {THEME_LABELS[t] ?? t}
    </span>
  );
}

function ItemRow({ it, first }: { it: VeilleItem; first: boolean }) {
  return (
    <li
      className="grid gap-x-4 gap-y-1 px-4 py-3.5 sm:grid-cols-[52px_1fr]"
      style={{ borderTop: first ? "none" : "1px solid rgba(255,255,255,0.045)" }}
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
          {it.themes.map((t) => (
            <ThemeBadge key={t} t={t} />
          ))}
          {it.backfill && (
            <span
              className="text-[10px]"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
              title="Publié avant que la source soit suivie : repris à son ajout"
            >
              · repris à l’ajout de la source
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function monthKey(iso: string) {
  return iso.slice(0, 7);
}

/**
 * Collecte automatique : indicateurs (étape 10), règles de tri (étape 6)
 * et articles repérés. Distincte des revues et des synthèses : ce bloc
 * montre ce que le robot a trouvé, pas ce que j'en ai tiré.
 */
export function VeilleCollecte({ feed, lastRun }: { feed: VeilleFeed; lastRun: LastRun | null }) {
  const items = feed.items;
  // Indicateurs sur les seuls articles suivis au fil de l'eau : ceux repris
  // à l'ajout d'une source n'ont pas été vus à leur date de publication.
  const suivis = items.filter((i) => !i.backfill);
  const repris = items.length - suivis.length;
  const oldest = suivis.at(-1)?.date;
  const newest = suivis[0]?.date;
  const active = feed.sources.filter((s) => s.ok).length;

  const byTheme = THEME_ORDER.map((t) => ({
    t,
    n: suivis.filter((i) => i.themes.includes(t)).length,
  })).filter((x) => x.n > 0);

  const monthsOf = (list: VeilleItem[]) => {
    const m = new Map<string, VeilleItem[]>();
    for (const it of list) {
      const k = monthKey(it.date);
      m.set(k, [...(m.get(k) ?? []), it]);
    }
    return [...m.entries()].sort(([a], [b]) => (a < b ? 1 : -1));
  };
  const monthRows = monthsOf(suivis);
  const allMonths = monthsOf(items);
  const maxMonth = Math.max(1, ...monthRows.map(([, v]) => v.length));

  return (
    <div id="veille-collecte" className="space-y-4 scroll-mt-32">
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
        {suivis.length} article{suivis.length > 1 ? "s" : ""} suivi{suivis.length > 1 ? "s" : ""}
        {oldest && newest
          ? ` (publiés du ${dayYear.format(new Date(oldest))} au ${dayYear.format(new Date(newest))})`
          : ""}
        {repris > 0 ? ` + ${repris} repris à l’ajout de sources` : ""}
        {" · "}
        {active}/{feed.sources.length} flux actifs
        {lastRun ? ` · dernière exécution le ${stamp.format(new Date(lastRun.at))}` : ""}
        {lastRun && !lastRun.ok ? " (en échec)" : ""}
        {feed.lastAddedAt ? ` · dernier article ajouté le ${stamp.format(new Date(feed.lastAddedAt))}` : ""}
      </p>

      {/* Indicateurs : volume par thème et par mois */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="card p-4 space-y-2.5">
          <p
            className="text-[10px] uppercase"
            style={{ letterSpacing: "0.14em", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
          >
            Par thème
          </p>
          <ul className="space-y-1.5">
            {byTheme.map(({ t, n }) => (
              <li key={t} className="flex items-center justify-between gap-3">
                <ThemeBadge t={t} />
                <span
                  className="text-xs"
                  style={{ color: "rgba(236,232,225,0.8)", fontFamily: "var(--font-mono)" }}
                >
                  {n}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4 space-y-2.5">
          <p
            className="text-[10px] uppercase"
            style={{ letterSpacing: "0.14em", color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
          >
            Par mois de publication
          </p>
          <ul className="space-y-1.5">
            {monthRows.map(([k, v]) => (
              <li key={k} className="grid grid-cols-[96px_1fr_28px] items-center gap-2">
                <span className="text-[11px]" style={{ color: "var(--color-muted)" }}>
                  {monthFmt.format(new Date(`${k}-15T12:00:00Z`))}
                </span>
                <span
                  className="h-1.5 rounded-full"
                  style={{
                    width: `${Math.max(4, (v.length / maxMonth) * 100)}%`,
                    background: "linear-gradient(90deg, var(--color-accent), var(--color-accent2))",
                    opacity: 0.75,
                  }}
                  aria-hidden
                />
                <span
                  className="text-xs text-right"
                  style={{ color: "rgba(236,232,225,0.8)", fontFamily: "var(--font-mono)" }}
                >
                  {v.length}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-[13px]" style={{ color: "var(--color-muted)" }}>
          Aucun article retenu sur la période.
        </p>
      ) : (
        <div className="card overflow-hidden">
          <ul>
            {items.slice(0, SHOWN).map((it, i) => (
              <ItemRow key={it.id} it={it} first={i === 0} />
            ))}
          </ul>
        </div>
      )}

      {items.length > SHOWN && (
        <details className="card overflow-hidden">
          <summary
            className="px-4 py-3 text-[13px] cursor-pointer"
            style={{ color: "rgba(236,232,225,0.85)" }}
          >
            Tous les articles repérés ({items.length})
          </summary>
          {allMonths.map(([k, v]) => (
            <div key={k}>
              <p
                className="px-4 pt-3 pb-1 text-[10px] uppercase"
                style={{
                  letterSpacing: "0.14em",
                  color: "var(--color-muted)",
                  fontFamily: "var(--font-mono)",
                  borderTop: "1px solid rgba(255,255,255,0.045)",
                }}
              >
                {monthFmt.format(new Date(`${k}-15T12:00:00Z`))} · {v.length}
              </p>
              <ul>
                {v.map((it, i) => (
                  <ItemRow key={it.id} it={it} first={i === 0} />
                ))}
              </ul>
            </div>
          ))}
        </details>
      )}

      {/* Règles de tri : le périmètre traduit en motifs */}
      {feed.rules && (
        <details id="veille-regles" className="card overflow-hidden scroll-mt-32">
          <summary
            className="px-4 py-3 text-[13px] cursor-pointer"
            style={{ color: "rgba(236,232,225,0.85)" }}
          >
            Règles de tri appliquées par le collecteur
          </summary>
          <div className="px-4 pb-4 space-y-4">
            {THEME_ORDER.filter((t) => feed.rules?.[t]).map((t) => {
              const r = feed.rules![t]!;
              return (
                <div key={t} className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <ThemeBadge t={t} />
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(236,232,225,0.75)" }}>
                    {r.rule}
                  </p>
                  {Object.entries(r.patterns).map(([name, pats]) => (
                    <div key={name} className="space-y-1">
                      <p className="text-[10.5px]" style={{ color: "var(--color-muted)" }}>
                        {name}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {pats.map((p) => (
                          <code
                            key={p}
                            className="text-[10.5px] px-1.5 py-px rounded"
                            style={{
                              background: "rgba(255,255,255,0.035)",
                              border: "1px solid rgba(255,255,255,0.05)",
                              color: "rgba(236,232,225,0.7)",
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {p}
                          </code>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Expressions régulières Python. Les sigles sont en casse exacte avec limites de mot
              (sinon « IA » trouverait « via ») ; le reste ignore la casse. Une correction des
              règles est réappliquée aux articles déjà retenus de la fenêtre de {feed.windowDays}{" "}
              jours ; les articles écartés ne sont pas conservés.
            </p>
          </div>
        </details>
      )}

      <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
        Articles repérés automatiquement selon les règles ci-dessus ; les alertes CERT-FR sont
        gardées d’office, même hors des deux thèmes. Ce bloc montre ce que le robot trouve. Ce que
        j’en lis et en retiens est dans le journal des revues et les synthèses.
      </p>
    </div>
  );
}
