import type { Step, StepStatus } from "@/lib/veille-method";

const STATUS: Record<StepStatus, { label: string; pill: string }> = {
  "en-place": { label: "En place", pill: "pill-green" },
  automatique: { label: "Automatique", pill: "pill-purple" },
  "en-cours": { label: "En cours", pill: "pill-yellow" },
  "a-mener": { label: "À mener", pill: "pill-accent" },
};

function ProofLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="tag-code"
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {label}
      {external ? " ↗" : ""}
    </a>
  );
}

/**
 * La veille en 10 étapes : ce que fait chaque étape, son état réel et
 * la preuve correspondante. L'état est calculé (lib/veille-method.ts).
 */
export function VeilleSteps({ steps }: { steps: Step[] }) {
  const done = steps.filter((s) => s.status !== "a-mener").length;

  return (
    <div id="veille-methode" className="space-y-4 scroll-mt-32">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: "var(--color-muted)" }}
        >
          La veille en 10 étapes
        </h3>
        <span
          className="text-[11px]"
          style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
        >
          {done} / {steps.length} engagées
        </span>
      </div>

      <ol className="grid gap-3 md:grid-cols-2 list-none m-0 p-0">
        {steps.map((s) => {
          const st = STATUS[s.status];
          return (
            <li
              key={s.n}
              className="card p-4 space-y-2.5"
              style={
                s.status === "a-mener"
                  ? { borderStyle: "dashed", borderColor: "rgba(226,105,60,0.22)" }
                  : undefined
              }
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-base font-bold shrink-0 w-7"
                  style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}
                >
                  {String(s.n).padStart(2, "0")}
                </span>
                <p className="text-sm font-semibold leading-snug flex-1">{s.title}</p>
                <span className={`pill ${st.pill} shrink-0`} style={{ fontSize: 10 }}>
                  {st.label}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {s.body}
              </p>
              {s.next && (
                <p className="text-xs leading-relaxed" style={{ color: "var(--color-yellow)" }}>
                  Prochaine action : {s.next}
                </p>
              )}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {s.proofs.map((p) => (
                  <ProofLink key={p.label} {...p} />
                ))}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="text-xs leading-relaxed pt-1" style={{ color: "var(--color-muted)" }}>
        Méthode inspirée du cycle de la veille (ancienne norme expérimentale AFNOR XP X50-053,
        1998, guides des URFIST). Le référentiel n’impose ni nombre d’étapes ni outil : il demande
        que « la veille [soit] régulière ». Les étapes 1 à 4 renvoient aux choix documentés sur
        cette page ; l’état des étapes 5 à 10 est tiré des données publiées (exécutions, revues,
        synthèses, bilans).
      </p>
    </div>
  );
}
