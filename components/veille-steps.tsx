import { GROUP_LABELS, type Step, type StepGroup, type StepStatus } from "@/lib/veille-method";

const STATUS: Record<StepStatus, { label: string; color: string; mark: string }> = {
  fait: { label: "Fait", color: "var(--color-green)", mark: "✓" },
  automatique: { label: "En place", color: "var(--color-green)", mark: "✓" },
  "a-faire": { label: "Pas encore commencé", color: "var(--color-yellow)", mark: "○" },
};

const GROUPS: StepGroup[] = ["preparation", "semaine", "trimestre"];

/**
 * Les 10 étapes, regroupées en trois temps : la mise en place (faite une
 * fois), le travail de chaque semaine, le point tous les trois mois.
 */
export function VeilleSteps({ steps }: { steps: Step[] }) {
  return (
    <div id="veille-methode" className="space-y-3 scroll-mt-32">
      <h3 className="text-base font-semibold">Ma méthode, en 10 étapes</h3>

      <div className="card overflow-hidden">
        {GROUPS.map((g, gi) => {
          const list = steps.filter((s) => s.group === g);
          return (
            <div
              key={g}
              className="px-4 py-3 space-y-2"
              style={{ borderTop: gi === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-muted)" }}>
                {GROUP_LABELS[g]}
              </p>
              <ol className="space-y-2 list-none m-0 p-0">
                {list.map((s) => {
                  const st = STATUS[s.status];
                  return (
                    <li key={s.n} className="flex gap-3 items-baseline">
                      <span
                        className="text-sm font-bold w-6 shrink-0"
                        style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                      >
                        {s.n}
                      </span>
                      <span className="min-w-0 flex-1 text-sm leading-relaxed">
                        <span className="font-semibold">{s.title}</span>
                        <span style={{ color: "var(--color-muted)" }}> — {s.body}</span>
                      </span>
                      <span className="text-[11px] shrink-0 whitespace-nowrap" style={{ color: st.color }}>
                        {st.mark} <span className="hidden sm:inline">{st.label}</span>
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </div>
  );
}
