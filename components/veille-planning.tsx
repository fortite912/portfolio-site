import { veillePlanning, type PlanStatus } from "@/lib/veille-planning";

const STATUS: Record<PlanStatus, { label: string; color: string; dot: string }> = {
  fait: { label: "Fait", color: "var(--color-green)", dot: "var(--color-green)" },
  "en-cours": { label: "En cours", color: "var(--color-yellow)", dot: "var(--color-yellow)" },
  "a-venir": { label: "À venir", color: "var(--color-muted)", dot: "rgba(255,255,255,0.25)" },
};

/**
 * Mon planning de veille jusqu'à l'épreuve : une frise de dates, chaque
 * jalon avec son état. Les jalons fixés par l'école sont signalés.
 */
export function VeillePlanning() {
  const jalons = veillePlanning();

  return (
    <div id="veille-planning" className="space-y-3 scroll-mt-32">
      <div className="space-y-1">
        <h3 className="text-base font-semibold">Mon planning jusqu’à l’épreuve</h3>
        <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Planning prévisionnel, de septembre 2026 au dépôt du dossier en mars 2027.
        </p>
      </div>

      <ol className="card p-4 sm:p-5 list-none m-0">
        {jalons.map((j, i) => {
          const st = STATUS[j.status];
          const last = i === jalons.length - 1;
          return (
            <li key={`${j.quand}-${j.titre}`} className="relative flex gap-4 pb-5 last:pb-0">
              {!last && (
                <span
                  className="absolute left-[5px] top-4 bottom-0 w-px"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                  aria-hidden
                />
              )}
              <span
                className="relative mt-1.5 w-[11px] h-[11px] rounded-full shrink-0"
                style={{
                  background: j.status === "a-venir" ? "transparent" : st.dot,
                  border: `2px solid ${st.dot}`,
                }}
                aria-hidden
              />
              <div className="min-w-0 flex-1 space-y-0.5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                  >
                    {j.quand}
                  </span>
                  <span className="text-[11px]" style={{ color: st.color }}>
                    {st.label}
                    {j.officiel ? " · date fixée par l’école" : ""}
                  </span>
                </div>
                <p className="text-sm font-semibold leading-snug">{j.titre}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {j.detail}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
