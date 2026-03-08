import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

const sBadge: Record<string, string> = {
  Done: "pill-green",
  "In progress": "pill-yellow",
  Planned: "pill-accent",
};
const sLabel: Record<string, string> = {
  Done: "Termin\u00e9",
  "In progress": "En cours",
  Planned: "Planifi\u00e9",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <div className="space-y-10">
      {/* Back */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm transition-colors"
        style={{ color: "var(--color-muted)" }}
      >
        &larr; Retour aux projets
      </Link>

      {/* Cover */}
      {project.cover && (
        <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            sizes="1100px"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,12,16,0.9) 0%, rgba(10,12,16,0.3) 50%, transparent)",
            }}
          />
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p style={{ color: "var(--color-muted)" }} className="max-w-2xl">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="pill pill-accent">{project.category}</span>
            )}
            <span className={`pill ${sBadge[project.status] ?? ""}`}>
              {sLabel[project.status] ?? project.status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <Link
            className="btn btn-primary"
            href={`/projects/${project.slug}/report`}
          >
            Rapport
          </Link>
          {project.pdf && (
            <a
              className="btn"
              href={project.pdf}
              target="_blank"
              rel="noreferrer"
            >
              PDF
            </a>
          )}
        </div>
      </div>

      {/* Objective */}
      <section className="card p-6">
        <p
          className="heading-section mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          Objectif
        </p>
        <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          {project.objective}
        </p>
      </section>

      {/* Info grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {project.stack?.length ? (
          <div className="card p-5">
            <p className="heading-section mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card p-5">
          <p className="heading-section mb-3">M&eacute;thode</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {project.method.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: "var(--color-accent)" }}>&bull;</span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <p className="heading-section mb-3">Validation</p>
          <ul className="space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {project.validation.map((v, i) => (
              <li key={i} className="flex gap-2">
                <span style={{ color: "var(--color-green)" }}>&check;</span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline */}
      {project.timeline?.length ? (
        <section className="space-y-4">
          <p className="heading-section">Timeline</p>
          <div className="grid gap-3">
            {project.timeline.map((step, idx) => (
              <div key={`${step.title}-${idx}`} className="card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: "rgba(94,187,255,0.12)",
                        color: "var(--color-accent)",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </div>
                  {step.badge && (
                    <span className="pill pill-muted" style={{ fontSize: 11 }}>
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.details?.length ? (
                  <ul
                    className="mt-3 ml-10 space-y-1 text-sm"
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
    </div>
  );
}
