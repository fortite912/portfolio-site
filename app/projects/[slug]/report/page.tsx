import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            &larr; {project.title}
          </Link>
          <h1 className="heading-lg">Rapport</h1>
          <p style={{ color: "var(--color-muted)" }}>
            Preuves + proc&eacute;dure reproductible.
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
          <p
            className="heading-section mb-4"
            style={{ color: "var(--color-accent)" }}
          >
            Preuves attendues
          </p>
          <ul className="space-y-2.5">
            {project.proof.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                <span
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--color-green)" }}
                >
                  &check;
                </span>
                {p}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Steps */}
      {project.timeline?.length ? (
        <section className="card p-6">
          <p className="heading-section mb-4">&Eacute;tapes</p>
          <div className="space-y-4">
            {project.timeline.map((step, idx) => (
              <div
                key={`${step.title}-${idx}`}
                className={idx > 0 ? "pt-4" : undefined}
                style={
                  idx > 0
                    ? { borderTop: "1px solid rgba(255,255,255,0.06)" }
                    : undefined
                }
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(94,187,255,0.12)",
                      color: "var(--color-accent)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{step.title}</span>
                  {step.badge && (
                    <span
                      className="pill pill-muted ml-auto"
                      style={{ fontSize: 11 }}
                    >
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.details?.length ? (
                  <ul
                    className="mt-2 ml-9 space-y-1 text-sm"
                    style={{ color: "var(--color-muted)" }}
                  >
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
        <p className="heading-section mb-3">Livrables</p>
        <div className="flex flex-wrap gap-2">
          {project.deliverables.map((d) => (
            <span key={d} className="pill">
              {d}
            </span>
          ))}
        </div>
      </section>

      {/* PDF */}
      {project.reportPdf && (
        <section className="card p-6">
          <p className="heading-section mb-3">Document</p>
          <a
            className="link"
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
