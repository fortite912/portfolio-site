import { veilleE5 } from "@/lib/experience";
import { revues } from "@/lib/veille-method";

const dayYear = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

const fmt = (d: string) => dayYear.format(new Date(`${d}T12:00:00Z`));

/**
 * Mon travail personnel : mes résumés, mes bilans et la trace de mes
 * revues de la semaine (scripts/veille/revue.py). Tant que rien n'est
 * publié, une seule ligne le dit.
 */
export function VeilleJournal() {
  const syntheses = [...veilleE5.syntheses].sort((a, b) => (a.date < b.date ? 1 : -1));
  const bilans = [...veilleE5.bilans].reverse();
  const dernieres = [...revues].reverse().slice(0, 3);
  const vide = syntheses.length === 0 && bilans.length === 0 && dernieres.length === 0;

  return (
    <div id="veille-syntheses" className="space-y-3 scroll-mt-32">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Ce que j’en retiens</h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Chaque semaine, les articles que je garde. Régulièrement, un résumé : un sujet, ce que
          j’en retiens et ce que ça change pour mon travail.
        </p>
      </div>

      {vide && (
        <div
          className="rounded-xl p-4 text-[13px] leading-relaxed"
          style={{
            background: "rgba(217,164,65,0.04)",
            border: "1px dashed rgba(217,164,65,0.22)",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Rien de publié pour l’instant : ma première revue et mon premier résumé arrivent.
        </div>
      )}

      {dernieres.length > 0 && (
        <ul id="veille-revues" className="card p-4 space-y-1.5 scroll-mt-32">
          {dernieres.map((r, i) => (
            <li key={`${r.date}-${i}`} className="text-[13px] leading-relaxed">
              <span className="font-semibold">Revue du {fmt(r.date)}</span>
              <span style={{ color: "var(--color-muted)" }}>
                {" "}
                — {r.vus} articles parcourus, {r.retenus.length} gardé{r.retenus.length > 1 ? "s" : ""}
                {r.retenus.length > 0 ? " : " : ""}
              </span>
              {r.retenus.map((a, j) => (
                <span key={a.id}>
                  {j > 0 && ", "}
                  <a href={a.link} target="_blank" rel="noreferrer" className="link-underline">
                    {a.title}
                  </a>
                </span>
              ))}
              {r.note && (
                <span className="block" style={{ color: "rgba(236,232,225,0.8)" }}>
                  {r.note}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {syntheses.map((s) => (
        <article key={`${s.date}-${s.sujet}`} className="card p-5 space-y-2.5">
          <p className="text-xs" style={{ color: "var(--color-accent)" }}>
            Résumé du {fmt(s.date)}
          </p>
          <h4 className="text-[15px] font-semibold leading-snug">{s.sujet}</h4>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
            <span className="font-semibold">Ce que je retiens : </span>
            {s.retenu}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
            <span className="font-semibold">Ce que ça change : </span>
            {s.impact}
          </p>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            Sources :{" "}
            {s.sources.map((src, i) => (
              <span key={src.url}>
                {i > 0 && ", "}
                <a href={src.url} target="_blank" rel="noreferrer" className="link-underline">
                  {src.media}
                </a>
              </span>
            ))}
          </p>
          {s.lien && (
            <a className="tag-code" href={s.lien.href}>
              {s.lien.label}
            </a>
          )}
        </article>
      ))}

      {bilans.map((b) => (
        <article key={b.date} className="card p-5 space-y-2">
          <p className="text-xs" style={{ color: "var(--color-accent)" }}>
            Bilan du {fmt(b.date)}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
            {b.constat}
          </p>
          <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
            <span className="font-semibold">Ce que je change : </span>
            {b.changements}
          </p>
        </article>
      ))}
    </div>
  );
}
