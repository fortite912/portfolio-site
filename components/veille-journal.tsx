import { veilleE5 } from "@/lib/experience";
import { revues } from "@/lib/veille-method";

const dayYear = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Paris",
});

const fmt = (d: string) => dayYear.format(new Date(`${d}T12:00:00Z`));

function Heading({ title, count, unit }: { title: string; count: number; unit: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h3
        className="text-sm font-semibold uppercase tracking-wider"
        style={{ color: "var(--color-muted)" }}
      >
        {title}
      </h3>
      <span
        className="text-[11px]"
        style={{
          color: count ? "var(--color-green)" : "var(--color-yellow)",
          fontFamily: "var(--font-mono)",
        }}
      >
        {count} {unit}
        {count > 1 ? "s" : ""}
      </span>
    </div>
  );
}

function Empty({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "rgba(217,164,65,0.04)", border: "1px dashed rgba(217,164,65,0.22)" }}
    >
      <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
        <span className="font-semibold" style={{ color: "var(--color-yellow)" }}>
          {title}
        </span>{" "}
        {children}
      </p>
    </div>
  );
}

/**
 * Le travail personnel de veille, séparé de la collecte automatique :
 * journal des revues hebdomadaires (scripts/veille/revue.py) et
 * synthèses rédigées. Les dates viennent des fichiers commités par moi.
 */
export function VeilleJournal() {
  const syntheses = [...veilleE5.syntheses].sort((a, b) => (a.date < b.date ? 1 : -1));
  const journal = [...revues].reverse();

  return (
    <>
      <div id="veille-revues" className="space-y-4 scroll-mt-32">
        <Heading title="Journal des revues" count={revues.length} unit="revue" />
        {journal.length === 0 ? (
          <Empty title="Première revue à venir.">
            Chaque semaine, je passe en revue les articles collectés : vus, lus, retenus pour une
            synthèse. Chaque revue est datée ici, au jour où je l’enregistre.
          </Empty>
        ) : (
          <div className="card overflow-hidden">
            <ul>
              {journal.map((r, i) => (
                <li
                  key={`${r.date}-${i}`}
                  className="p-4 space-y-2"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.045)" }}
                >
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span
                      className="text-[12px] font-semibold"
                      style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                    >
                      {fmt(r.date)}
                    </span>
                    <span
                      className="text-[11px]"
                      style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {r.vus} vus · {r.lus} lus · {r.retenus.length} retenu
                      {r.retenus.length > 1 ? "s" : ""}
                    </span>
                  </div>
                  {r.note && (
                    <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
                      {r.note}
                    </p>
                  )}
                  {r.retenus.length > 0 && (
                    <ul className="space-y-1">
                      {r.retenus.map((a) => (
                        <li key={a.id} className="text-xs leading-relaxed">
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noreferrer"
                            className="link-underline"
                            style={{ color: "rgba(236,232,225,0.75)" }}
                          >
                            {a.title}
                          </a>
                          <span style={{ color: "var(--color-muted)" }}> — {a.source}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div id="veille-syntheses" className="space-y-4 scroll-mt-32">
        <Heading title="Synthèses" count={syntheses.length} unit="publiée" />
        {syntheses.length === 0 ? (
          <Empty title="Premières synthèses en cours de rédaction.">
            Chacune suivra le même format : les faits et leurs sources, ce que je retiens, et
            surtout ce que cela change concrètement pour un support de niveau 1 ou un
            administrateur.
          </Empty>
        ) : (
          <div className="space-y-3">
            {syntheses.map((s) => (
              <article key={`${s.date}-${s.sujet}`} className="card p-5 space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span
                    className="text-[11px]"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {fmt(s.date)}
                  </span>
                  <h4 className="text-[15px] font-semibold leading-snug">{s.sujet}</h4>
                </div>
                <div className="space-y-2 text-[13px] leading-relaxed">
                  <p style={{ color: "rgba(236,232,225,0.85)" }}>
                    <span className="font-semibold">Ce que je retiens. </span>
                    {s.retenu}
                  </p>
                  <p style={{ color: "rgba(236,232,225,0.85)" }}>
                    <span className="font-semibold">Ce que ça change. </span>
                    {s.impact}
                  </p>
                </div>
                <ul className="flex flex-wrap gap-x-4 gap-y-1">
                  {s.sources.map((src) => (
                    <li key={src.url} className="text-xs">
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline"
                        style={{ color: "var(--color-muted)" }}
                      >
                        {src.media} — {src.titre}
                        {src.date ? ` (${fmt(src.date)})` : ""}
                      </a>
                    </li>
                  ))}
                </ul>
                {s.lien && (
                  <a className="tag-code" href={s.lien.href}>
                    {s.lien.label}
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {veilleE5.bilans.length > 0 && (
        <div id="veille-bilans" className="space-y-4 scroll-mt-32">
          <Heading title="Bilans" count={veilleE5.bilans.length} unit="bilan" />
          <div className="card overflow-hidden">
            <ul>
              {[...veilleE5.bilans].reverse().map((b, i) => (
                <li
                  key={b.date}
                  className="p-4 space-y-1.5 text-[13px] leading-relaxed"
                  style={{ borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.045)" }}
                >
                  <span
                    className="text-[12px] font-semibold"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {fmt(b.date)}
                  </span>
                  <p style={{ color: "rgba(236,232,225,0.85)" }}>
                    <span className="font-semibold">Constat. </span>
                    {b.constat}
                  </p>
                  <p style={{ color: "rgba(236,232,225,0.85)" }}>
                    <span className="font-semibold">Ce que je change. </span>
                    {b.changements}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
