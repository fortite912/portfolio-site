import { veilleE5 } from "@/lib/experience";

/**
 * Pourquoi ces deux sujets plutôt que d'autres : les sujets écartés et
 * la raison de chaque refus, puis ce qui justifie le choix retenu.
 */
export function VeilleChoix() {
  const { ecartes, raisons } = veilleE5.choix;

  return (
    <div id="veille-choix" className="space-y-3 scroll-mt-32">
      <h3 className="text-base font-semibold">Pourquoi ces sujets plutôt que d’autres</h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card p-5 space-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
            Les sujets que j’ai écartés
          </p>
          <ul className="space-y-3">
            {ecartes.map((e) => (
              <li key={e.sujet} className="text-[13px] leading-relaxed">
                <span className="font-semibold">{e.sujet}</span>
                <span className="block" style={{ color: "var(--color-muted)" }}>
                  {e.raison}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5 space-y-3" style={{ borderColor: "rgba(127,163,127,0.22)" }}>
          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-green)" }}>
            Ce qui justifie mon choix
          </p>
          <ul className="space-y-3">
            {raisons.map((r) => (
              <li key={r.titre} className="text-[13px] leading-relaxed">
                <span className="font-semibold">{r.titre}</span>
                <span className="block" style={{ color: "var(--color-muted)" }}>
                  {r.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
