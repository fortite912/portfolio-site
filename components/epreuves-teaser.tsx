import Link from "next/link";
import { ccfE6, oralE5 } from "@/lib/experience";
import { AnimateOnScroll } from "@/components/animate-on-scroll";

/**
 * Accès direct aux épreuves depuis l'accueil.
 * Un jury ou un enseignant doit trouver E5 et E6 en un clic, sans
 * passer par le parcours. Les chiffres sont dérivés des données.
 */
export function EpreuvesTeaser() {
  const covered = oralE5.competences.filter((c) => c.coverage === "couverte").length;

  const items = [
    {
      code: oralE5.code,
      title: oralE5.title,
      meta: `${oralE5.evaluation} · ${covered} compétences sur ${oralE5.competences.length} avec réalisations identifiées`,
      status: oralE5.status,
      href: "/epreuves#oral",
      color: "var(--color-accent)",
      border: "rgba(226,105,60,0.18)",
    },
    {
      code: ccfE6.code,
      title: ccfE6.title,
      meta: `${ccfE6.evaluation} · deux réalisations professionnelles`,
      status: ccfE6.status,
      href: "/epreuves#ccf",
      color: "var(--color-accent2)",
      border: "rgba(79,138,139,0.18)",
    },
  ];

  return (
    <section className="space-y-6">
      <AnimateOnScroll>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="heading-section">Épreuves</p>
            <h2 className="heading-lg mt-2">Ce que le jury évalue</h2>
          </div>
          <Link className="btn text-sm" href="/epreuves">
            Page Épreuves
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </AnimateOnScroll>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((it, i) => (
          <AnimateOnScroll key={it.code} delay={i * 100}>
            <Link
              href={it.href}
              className="card card-hover card-spotlight p-5 flex gap-4 items-start h-full"
              style={{ borderColor: it.border }}
            >
              <span
                className="text-lg font-bold shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  color: it.color,
                  fontFamily: "var(--font-mono)",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${it.border}`,
                }}
              >
                {it.code}
              </span>
              <span className="min-w-0 space-y-1.5">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold leading-snug">{it.title}</span>
                  <span className="pill pill-yellow" style={{ fontSize: 10 }}>
                    {it.status}
                  </span>
                </span>
                <span
                  className="block text-xs leading-relaxed"
                  style={{ color: "var(--color-muted)" }}
                >
                  {it.meta}
                </span>
              </span>
            </Link>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
