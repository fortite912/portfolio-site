import { TOPIC_LABELS, type VeilleFeed, type VeilleTopic } from "@/lib/veille-feed";

const ORDER: VeilleTopic[] = ["sujet1", "sujet2", "deux", "outils", "legal"];

type Row = { key: string; name: string; href: string; why: string; note?: string; topic?: VeilleTopic };

/**
 * Mes sources, rangées par sujet, avec la raison de chaque choix. L'état
 * technique de chaque flux est dans les détails techniques.
 */
export function VeilleSources({ feed }: { feed: VeilleFeed }) {
  const rows: Row[] = [
    ...feed.sources.map((s) => ({
      key: s.id ?? s.url,
      name: s.name,
      href: s.site ?? s.url,
      why: s.why ?? s.kind,
      topic: s.topic,
      note: s.type === "Outil" ? undefined : s.lang === "en" ? "en anglais" : undefined,
    })),
    ...(feed.manualSources ?? []).map((s) => ({
      key: s.name,
      name: s.name,
      href: s.site,
      why: s.why,
      topic: s.topic,
      note: "je la consulte moi-même",
    })),
  ];
  // Une source suivie par plusieurs flux (CERT-FR) n'apparaît qu'une fois
  const unique = rows.filter((s, i) => rows.findIndex((x) => x.name === s.name) === i);
  const groups = ORDER.map((t) => ({ t, list: unique.filter((s) => s.topic === t) }))
    .filter((g) => g.list.length > 0);
  const sansSujet = unique.filter((s) => !s.topic);

  return (
    <div id="veille-sources" className="space-y-3 scroll-mt-32">
      <h3 className="text-base font-semibold">Mes sources ({unique.length})</h3>
      <div className="md:columns-2 gap-x-8">
        {[...groups, ...(sansSujet.length ? [{ t: undefined, list: sansSujet }] : [])].map((g) => (
          <div key={g.t ?? "autres"} className="space-y-2 mb-5 break-inside-avoid">
            <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
              {g.t ? TOPIC_LABELS[g.t] : "Autres sources"}
            </p>
            <ul className="space-y-2">
              {g.list.map((s) => (
                <li key={s.key} className="text-xs leading-relaxed">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-sm font-semibold"
                    style={{ color: "rgba(236,232,225,0.92)" }}
                  >
                    {s.name}
                  </a>
                  {s.note && <span style={{ color: "var(--color-muted)" }}> ({s.note})</span>}
                  <span className="block" style={{ color: "var(--color-muted)" }}>
                    {s.why}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
