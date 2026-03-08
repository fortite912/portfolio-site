import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Params = { slug: string };

export default async function ReportPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <Link
            className="text-sm text-white/50 hover:text-white transition-colors"
            href={`/projects/${project.slug}`}
          >
            &larr; {project.title}
          </Link>
          <h1 className="text-2xl font-bold">Rapport</h1>
          <p className="text-white/55">
            Attendu : preuves + proc&eacute;dure reproductible.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link className="btn" href={`/projects/${project.slug}`}>
            Projet
          </Link>
          <Link className="btn" href="/projects">
            Liste
          </Link>
        </div>
      </div>

      {/* Proof */}
      {project.proof?.length ? (
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-[rgb(var(--accent))] uppercase tracking-wide">
            Preuves attendues
          </h2>
          <ul className="mt-4 space-y-2">
            {project.proof.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm text-white/80"
              >
                <span className="mt-0.5 text-[rgb(var(--green))] shrink-0">
                  &check;
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Timeline steps */}
      {project.timeline?.length ? (
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
            &Eacute;tapes
          </h2>
          <div className="mt-4 space-y-4">
            {project.timeline.map((step, idx) => (
              <div
                key={`${step.title}-${idx}`}
                className={
                  idx > 0 ? "border-t border-white/8 pt-4" : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(var(--accent),0.12)] text-xs font-bold text-[rgb(var(--accent))]">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{step.title}</span>
                  {step.badge && (
                    <span className="pill pill-muted text-[11px] ml-auto">
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.details?.length ? (
                  <ul className="mt-2 ml-9 space-y-1 text-sm text-white/65">
                    {step.details.map((d, i) => (
                      <li key={`${d}-${i}`}>{d}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Deliverables */}
      <section className="card p-6">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
          Livrables
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.deliverables.map((d) => (
            <span key={d} className="pill">
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* PDF download */}
      {project.reportPdf && (
        <section className="card p-6">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
            PDF
          </h2>
          <a
            className="link mt-3 inline-block"
            href={project.reportPdf}
            target="_blank"
            rel="noreferrer"
          >
            T&eacute;l&eacute;charger / ouvrir le PDF
          </a>
        </section>
      )}
    </div>
  );
}
