import { veilleE5 } from "@/lib/experience";
import { getLastRun, getVeilleFeed } from "@/lib/veille-feed";
import { revues, sourceCount, veilleSteps } from "@/lib/veille-method";
import type { VeilleThemeSpec } from "@/lib/types";
import { AnimateOnScroll } from "@/components/animate-on-scroll";
import { SectionNum } from "@/components/doc-meta";
import { VeilleSteps } from "@/components/veille-steps";
import { VeilleChoix } from "@/components/veille-choix";
import { VeillePlanning } from "@/components/veille-planning";
import { VeilleRecent } from "@/components/veille-recent";
import { VeilleJournal } from "@/components/veille-journal";
import { VeilleSources } from "@/components/veille-sources";
import { VeilleTechnique } from "@/components/veille-collecte";

const longDate = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

function SubjectCard({
  n,
  theme,
  color,
}: {
  n: number;
  theme: VeilleThemeSpec;
  color: string;
}) {
  return (
    <div className="card p-5 space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color }}>
        Sujet {n}
      </p>
      <div className="space-y-1">
        <p className="text-[15px] font-semibold leading-snug">{theme.title}</p>
        <p className="text-[13px] leading-relaxed" style={{ color: "rgba(236,232,225,0.85)" }}>
          En clair : {theme.plain.charAt(0).toLowerCase() + theme.plain.slice(1)}
        </p>
      </div>
      <p className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
        <span className="font-semibold" style={{ color: "rgba(236,232,225,0.8)" }}>
          Pourquoi :{" "}
        </span>
        {theme.why}
      </p>
      <div className="text-[13px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
        <p className="font-semibold" style={{ color: "rgba(236,232,225,0.8)" }}>
          J’inclus :
        </p>
        <ul className="list-disc pl-5">
          {theme.axes.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        {theme.exclu && (
          <p className="mt-1">
            <span className="font-semibold" style={{ color: "rgba(236,232,225,0.8)" }}>
              Je laisse de côté :{" "}
            </span>
            {theme.exclu}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Veille technologique (fait partie de l'épreuve E5, compétence C6),
 * lisible sans connaissance technique :
 *   1. ce qu'est cette veille, où elle en est, avec les chiffres ;
 *   2. mes deux sujets, ce que j'inclus et ce que je laisse de côté ;
 *   3. pourquoi ces sujets plutôt que d'autres ;
 *   4. ma méthode en 10 étapes, regroupées en trois temps ;
 *   5. mon planning jusqu'à l'épreuve ;
 *   6. ce que le programme a trouvé récemment, par sujet ;
 *   7. ce que j'en retiens (revues, résumés, bilans) ;
 *   8. mes sources, par sujet ;
 *   9. les détails techniques, fermés par défaut.
 * n : numéro dans le sommaire de la page ; absent sur une page seule.
 */
export async function VeilleSection({ n }: { n?: number } = {}) {
  const { epreuve, competence, themePrincipal, themeSecondaire } = veilleE5;
  const [feed, lastRun] = await Promise.all([getVeilleFeed(), getLastRun()]);
  const steps = veilleSteps(feed, lastRun);

  const debut = feed.sources
    .map((s) => s.since)
    .filter((d): d is string => Boolean(d))
    .sort()[0];
  const derniereRevue = revues.at(-1)?.date;

  return (
    <AnimateOnScroll>
      <section id="veille" className="space-y-10 scroll-mt-32">
        <div className="space-y-3">
          <p className="heading-section" style={{ margin: 0 }}>
            Fait partie de l’épreuve {epreuve}
          </p>
          <h2 className="heading-lg">
            <SectionNum n={n}>Ma veille technologique</SectionNum>
          </h2>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            Compétence évaluée : {competence} (C6)
          </p>
          <p className="text-[15px] leading-relaxed max-w-2xl" style={{ color: "rgba(236,232,225,0.88)" }}>
            Je suis l’actualité de deux sujets liés à mon futur métier. Un programme relève chaque
            jour les articles qui en parlent dans mes sources. Mon travail : les trier chaque
            semaine et écrire ce que j’en retiens.
          </p>
          <p
            className="text-xs flex flex-wrap gap-x-4 gap-y-1"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
          >
            {debut && <span>Collecte depuis le {longDate.format(new Date(debut))}</span>}
            <span>{feed.items.length} articles relevés</span>
            <span>{sourceCount(feed)} sources</span>
            <span>
              {derniereRevue
                ? `Dernière revue : ${longDate.format(new Date(`${derniereRevue}T12:00:00Z`))}`
                : "Tri et résumés : pas encore commencés"}
            </span>
          </p>
        </div>

        <div id="veille-themes" className="space-y-3 scroll-mt-32">
          <h3 className="text-base font-semibold">Mes deux sujets</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <SubjectCard n={1} theme={themePrincipal} color="var(--color-green)" />
            <SubjectCard n={2} theme={themeSecondaire} color="var(--color-accent)" />
          </div>
        </div>

        <VeilleChoix />

        <VeilleSteps steps={steps} />

        <VeillePlanning />

        <VeilleRecent feed={feed} />

        <VeilleJournal />

        <VeilleSources feed={feed} />

        <VeilleTechnique feed={feed} lastRun={lastRun} />
      </section>
    </AnimateOnScroll>
  );
}
