import { daysSince, type VeilleFeed } from "@/lib/veille-feed";

const STALE_DAYS = 14;

const day = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
});

/**
 * Sources suivies, lues dans la collecte publiée : la liste affichée est
 * exactement celle que le collecteur utilise, avec l'état de chaque flux.
 */
export function VeilleSources({ feed }: { feed: VeilleFeed }) {
  const manual = feed.manualSources ?? [];

  return (
    <div id="veille-sources" className="space-y-4 scroll-mt-32">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-muted)" }}
        >
          Sources suivies
        </h3>
        <a
          href="/veille/sources.opml"
          className="text-[11px] doc-toc-link"
          style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
        >
          export OPML →
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {feed.sources.map((s) => {
          const age = s.lastItem ? daysSince(s.lastItem) : null;
          const stale = age !== null && age > STALE_DAYS;
          const health = !s.ok
            ? { text: `flux en échec${s.error ? ` (${s.error})` : ""}`, color: "var(--color-red)" }
            : !s.lastItem
              ? { text: "aucun article lu dans le flux", color: "var(--color-yellow)" }
              : stale
                ? { text: `sans nouvel article depuis ${age} jours`, color: "var(--color-yellow)" }
                : { text: `dernier article le ${day.format(new Date(s.lastItem))}`, color: "var(--color-green)" };
          return (
            <a
              key={s.id ?? s.url}
              href={s.site ?? s.url}
              target="_blank"
              rel="noreferrer"
              className="card card-hover p-4 space-y-1.5 block"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  {s.name}
                  <span className="font-normal" style={{ color: "var(--color-muted)" }}>
                    {" "}· {s.kind}
                  </span>
                </p>
                <span
                  className="text-[10px] shrink-0"
                  style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                >
                  {[s.type, s.lang?.toUpperCase()].filter(Boolean).join(" · ")}
                </span>
              </div>
              {s.why && (
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {s.why}
                </p>
              )}
              <p
                className="text-[10.5px] flex flex-wrap gap-x-3"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                <span style={{ color: health.color }}>● {health.text}</span>
                {s.since && (
                  <span style={{ color: "var(--color-muted)" }}>
                    suivie depuis le {day.format(new Date(s.since))}
                  </span>
                )}
              </p>
            </a>
          );
        })}

        {manual.map((s) => (
          <a
            key={s.name}
            href={s.site}
            target="_blank"
            rel="noreferrer"
            className="card card-hover p-4 space-y-1.5 block"
            style={{ borderStyle: "dashed" }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold">
                {s.name}
                <span className="font-normal" style={{ color: "var(--color-muted)" }}>
                  {" "}· {s.kind}
                </span>
              </p>
              <span
                className="text-[10px] shrink-0"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
              >
                lue à la main
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
              {s.why}
            </p>
            {s.since && (
              <p
                className="text-[10.5px]"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
              >
                suivie depuis le {day.format(new Date(s.since))}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
