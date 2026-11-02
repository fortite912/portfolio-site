import {
  COLLECTOR_URL,
  THEME_LABELS,
  WORKFLOW_URL,
  daysSince,
  type LastRun,
  type VeilleFeed,
  type VeilleItem,
  type VeilleTheme,
} from "@/lib/veille-feed";
import { revues } from "@/lib/veille-method";

const THEME_ORDER: VeilleTheme[] = ["ia-support", "acces", "outils", "alerte"];
const STALE_DAYS = 14;

const tz = { timeZone: "Europe/Paris" } as const;
const day = new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", ...tz });
const stamp = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  ...tz,
});
const monthFmt = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", ...tz });

const mono = { fontFamily: "var(--font-mono)" } as const;
const muted = { color: "var(--color-muted)" } as const;

function Sub({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) {
  return (
    <details id={id} className="rounded-lg scroll-mt-32" style={{ border: "1px solid rgba(255,255,255,0.06)" }}>
      <summary className="px-3 py-2 text-[13px] cursor-pointer" style={{ color: "rgba(236,232,225,0.85)" }}>
        {title}
      </summary>
      <div className="px-3 pb-3 space-y-2">{children}</div>
    </details>
  );
}

/**
 * Détails techniques de la veille, fermés par défaut : comment la
 * collecte fonctionne, ses chiffres, l'état des flux, les règles de tri,
 * tous les articles. Pour le jury qui veut vérifier, pas pour la lecture.
 */
export function VeilleTechnique({ feed, lastRun }: { feed: VeilleFeed; lastRun: LastRun | null }) {
  const items = feed.items;
  const suivis = items.filter((i) => !i.backfill);
  const repris = items.length - suivis.length;
  const actifs = feed.sources.filter((s) => s.ok).length;

  const months = new Map<string, VeilleItem[]>();
  for (const it of items) {
    const k = it.date.slice(0, 7);
    months.set(k, [...(months.get(k) ?? []), it]);
  }
  const monthRows = [...months.entries()].sort(([a], [b]) => (a < b ? 1 : -1));

  return (
    <details id="veille-technique" className="card overflow-hidden scroll-mt-32">
      <summary className="px-4 py-3 text-sm font-semibold cursor-pointer">
        Détails techniques : comment fonctionne la collecte
      </summary>

      <div className="px-4 pb-4 space-y-4 text-xs leading-relaxed" style={{ color: "rgba(236,232,225,0.8)" }}>
        <p>
          Chaque jour, un programme lancé par GitHub Actions lit les flux RSS de mes sources, garde
          les articles qui contiennent les mots-clés de mes sujets, et publie le résultat sur cette
          page. Toutes les alertes de sécurité officielles (CERT-FR) sont gardées. Le programme
          repère ; c’est moi qui lis et qui trie, chaque semaine.
        </p>

        <ul className="space-y-1" style={mono}>
          <li>
            {suivis.length} articles suivis
            {repris > 0 ? ` + ${repris} repris à l’ajout de nouvelles sources (exclus des chiffres)` : ""}
          </li>
          <li>
            Par sujet :{" "}
            {THEME_ORDER.map((t) => `${THEME_LABELS[t]} ${suivis.filter((i) => i.themes.includes(t)).length}`).join(
              " · ",
            )}
          </li>
          <li>
            {actifs} flux sur {feed.sources.length} fonctionnent
            {lastRun ? ` · dernière collecte le ${stamp.format(new Date(lastRun.at))}${lastRun.ok ? "" : " (en échec)"}` : ""}
            {feed.lastAddedAt ? ` · dernier article ajouté le ${stamp.format(new Date(feed.lastAddedAt))}` : ""}
          </li>
        </ul>

        <Sub title="État de chaque flux">
          <ul className="space-y-1" style={mono}>
            {feed.sources.map((s) => {
              const age = s.lastItem ? daysSince(s.lastItem) : null;
              const etat = !s.ok
                ? { t: `en échec${s.error ? ` (${s.error})` : ""}`, c: "var(--color-red)" }
                : !s.lastItem
                  ? { t: "aucun article lu", c: "var(--color-yellow)" }
                  : age !== null && age > STALE_DAYS
                    ? { t: `rien de nouveau depuis ${age} jours`, c: "var(--color-yellow)" }
                    : { t: `dernier article le ${day.format(new Date(s.lastItem))}`, c: "var(--color-green)" };
              return (
                <li key={s.id ?? s.url}>
                  <span style={{ color: etat.c }}>●</span> {s.name} ({s.kind}) — {etat.t}
                  {s.since ? ` · suivie depuis le ${day.format(new Date(s.since))}` : ""}
                </li>
              );
            })}
          </ul>
        </Sub>

        {feed.rules && (
          <Sub id="veille-regles" title="Règles de tri (mots-clés)">
            {THEME_ORDER.filter((t) => feed.rules?.[t]).map((t) => {
              const r = feed.rules![t]!;
              return (
                <div key={t} className="space-y-1.5 pt-1">
                  <p className="font-semibold">{THEME_LABELS[t]}</p>
                  <p style={muted}>{r.rule}</p>
                  {Object.entries(r.patterns).map(([name, pats]) => (
                    <p key={name} style={{ ...mono, ...muted, fontSize: 10.5 }}>
                      {name} : {pats.join("  ")}
                    </p>
                  ))}
                </div>
              );
            })}
            <p style={muted}>
              Expressions régulières Python. Une correction des règles est réappliquée aux articles
              déjà gardés ; les articles écartés ne sont pas conservés.
            </p>
          </Sub>
        )}

        <Sub title={`Tous les articles trouvés (${items.length})`}>
          {monthRows.map(([k, v]) => (
            <div key={k} className="space-y-1">
              <p className="font-semibold pt-1">
                {monthFmt.format(new Date(`${k}-15T12:00:00Z`))} ({v.length})
              </p>
              <ul className="space-y-1">
                {v.map((it) => (
                  <li key={it.id}>
                    <span style={{ ...mono, ...muted }}>{day.format(new Date(it.date)).slice(0, 5)} </span>
                    <a href={it.link} target="_blank" rel="noreferrer" className="link-underline">
                      {it.title}
                    </a>
                    <span style={muted}>
                      {" "}
                      — {it.source}
                      {it.backfill ? " (repris à l’ajout de la source)" : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Sub>

        {revues.length > 0 && (
          <Sub title={`Détail de mes revues (${revues.length})`}>
            {[...revues].reverse().map((r, i) => (
              <div key={`${r.date}-${i}`} className="space-y-1 pt-1">
                <p className="font-semibold">
                  {day.format(new Date(`${r.date}T12:00:00Z`))} — {r.vus} parcourus, {r.lus} lus,{" "}
                  {r.retenus.length} gardés
                </p>
                {r.note && <p>{r.note}</p>}
                <ul>
                  {r.retenus.map((a) => (
                    <li key={a.id}>
                      <a href={a.link} target="_blank" rel="noreferrer" className="link-underline">
                        {a.title}
                      </a>
                      <span style={muted}> — {a.source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Sub>
        )}

        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <a className="link-underline" href={WORKFLOW_URL} target="_blank" rel="noreferrer">
            Historique des collectes ↗
          </a>
          <a className="link-underline" href={COLLECTOR_URL} target="_blank" rel="noreferrer">
            Code du programme ↗
          </a>
          <a className="link-underline" href="/veille/rss.xml">
            Flux RSS de ma veille
          </a>
          <a className="link-underline" href="/veille/sources.opml">
            Liste des sources (OPML)
          </a>
        </p>
      </div>
    </details>
  );
}
