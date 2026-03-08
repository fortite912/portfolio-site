// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

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
      <div className="flex items-start justify-between gap-6">
        <div className="space-y-2">
          <Link className="text-sm text-white/70 hover:text-white" href="/projects">
            ← Projets
          </Link>

          <h1 className="text-2xl font-bold">{project.title}</h1>

          {project.subtitle && (
            <p className="text-white/70 max-w-2xl">{project.subtitle}</p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {project.category && <span className="pill">{project.category}</span>}
            <span className="pill">Statut : {project.status}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-2">
            <Link className="btn" href="/contact">
              Contact
            </Link>
            <Link className="btn btn-primary" href={`/projects/${project.slug}/report`}>
              Rapport
            </Link>
          </div>

          {project.pdf && (
            <a
              className="text-sm underline text-white/80 hover:text-white"
              href={project.pdf}
              target="_blank"
              rel="noreferrer"
            >
              Télécharger le PDF
            </a>
          )}
        </div>
      </div>

      {project.stack?.length ? (
        <section className="card p-5">
          <div className="text-sm font-semibold">Stack</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="pill">
                {s}
              </span>
            ))}
          </div>
        </section>
      ) : null}

      {project.timeline?.length ? (
        <section className="space-y-3">
          <div className="text-sm font-semibold text-white/80">Timeline</div>

          <div className="grid gap-3">
            {project.timeline.map((step, idx) => (
              <div key={`${step.title}-${idx}`} className="card p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-semibold">{step.title}</div>
                  {step.badge && <span className="pill">{step.badge}</span>}
                </div>

                {step.details?.length ? (
                  <ul className="mt-3 list-disc pl-5 text-white/75 space-y-1">
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
    </div>
  );
}
