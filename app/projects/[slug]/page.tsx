import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

const statusStyle: Record<string, string> = {
  Done: "pill-green",
  "In progress": "pill-yellow",
  Planned: "pill-accent",
};

const statusLabel: Record<string, string> = {
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
    <div className="space-y-8">
      {/* Back link */}
      <Link
        className="inline-flex items-center gap-1 text-sm text-white/50 hover:text-white transition-colors"
        href="/projects"
      >
        &larr; Projets
      </Link>

      {/* Cover + header */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold">{project.title}</h1>
          <p className="text-white/60 max-w-2xl">{project.subtitle}</p>

          <div className="flex flex-wrap items-center gap-2">
            {project.category && (
              <span className="pill pill-accent">{project.category}</span>
            )}
            <span className={`pill ${statusStyle[project.status] ?? ""}`}>
              {statusLabel[project.status] ?? project.status}
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
          <Link className="btn" href="/contact">
            Contact
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
        <h2 className="text-sm font-semibold text-[rgb(var(--accent))] uppercase tracking-wide">
          Objectif
        </h2>
        <p className="mt-2 text-white/80 leading-relaxed">
          {project.objective}
        </p>
      </section>

      {/* Info grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* Stack */}
        {project.stack?.length ? (
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
              Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="pill">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {/* Method */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
            M&eacute;thode
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            {project.method.map((m, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[rgb(var(--accent))] shrink-0">
                  &bull;
                </span>
                {m}
              </li>
            ))}
          </ul>
        </div>

        {/* Validation */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
            Validation
          </h3>
          <ul className="mt-3 space-y-1.5 text-sm text-white/75">
            {project.validation.map((v, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-[rgb(var(--green))] shrink-0">
                  &check;
                </span>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline */}
      {project.timeline?.length ? (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wide">
            Timeline
          </h2>

          <div className="grid gap-3">
            {project.timeline.map((step, idx) => (
              <div key={`${step.title}-${idx}`} className="card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(var(--accent),0.12)] text-xs font-bold text-[rgb(var(--accent))]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </div>
                  {step.badge && (
                    <span className="pill pill-muted text-[11px]">
                      {step.badge}
                    </span>
                  )}
                </div>

                {step.details?.length ? (
                  <ul className="mt-3 ml-10 space-y-1 text-sm text-white/65">
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
    </div>
  );
}
