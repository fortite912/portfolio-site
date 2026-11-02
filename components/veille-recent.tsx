import type { VeilleFeed, VeilleItem, VeilleTheme } from "@/lib/veille-feed";

const PER_SUBJECT = 3;

const dayMonth = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  timeZone: "Europe/Paris",
});

function List({ items, english }: { items: VeilleItem[]; english: Set<string> }) {
  if (items.length === 0) {
    return (
      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
        Rien de nouveau ces derniers jours.
      </p>
    );
  }
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it.id} className="flex gap-3">
          <span
            className="text-xs w-14 shrink-0 pt-0.5"
            style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
          >
            {dayMonth.format(new Date(it.date))}
          </span>
          <span className="min-w-0">
            <a
              href={it.link}
              target="_blank"
              rel="noreferrer"
              className="doc-toc-link block text-sm font-medium leading-snug"
              style={{ color: "rgba(236,232,225,0.92)" }}
            >
              {it.title}
            </a>
            <span className="block text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
              {it.source}
              {english.has(it.source) ? " (article en anglais)" : ""}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Ce que le programme a relevé, présenté honnêtement : une liste brute,
 * pas encore triée par moi, rangée par sujet pour qu'on voie à quoi
 * chaque article se rattache.
 */
export function VeilleRecent({ feed }: { feed: VeilleFeed }) {
  const english = new Set(feed.sources.filter((s) => s.lang === "en").map((s) => s.name));
  const latest = (t: VeilleTheme) => feed.items.filter((i) => i.themes.includes(t)).slice(0, PER_SUBJECT);

  return (
    <div id="veille-collecte" className="space-y-3 scroll-mt-32">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Ce que le programme a trouvé récemment</h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Liste automatique, pas encore triée par moi : ce sont les articles que je passe en revue.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-4 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-green)" }}>
            Sujet 1 · L’IA et le support
          </p>
          <List items={latest("ia-support")} english={english} />
        </div>
        <div className="card p-4 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-accent)" }}>
            Sujet 2 · Protéger les connexions
          </p>
          <List items={latest("acces")} english={english} />
        </div>
      </div>
    </div>
  );
}
