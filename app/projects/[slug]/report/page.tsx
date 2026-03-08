// app/projects/[slug]/report/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Params = { slug: string };

export default async function ReportPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Rapport — {project.title}</h1>
          <p className="mt-1 text-white/70">Attendu : preuves + procédure reproductible.</p>
        </div>
        <div className="flex gap-2">
          <Link className="btn" href={`/projects/${project.slug}`}>
            Projet
          </Link>
          <Link className="btn" href="/projects">
            Liste
          </Link>
        </div>
      </div>

      <div className="card p-4">
        <h2 className="text-base font-semibold">Preuves attendues</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
          {project.proof.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>

      <div className="card p-4">
        <h2 className="text-base font-semibold">Étapes</h2>
        <div className="mt-3 space-y-3">
          {project.timeline.map((step) => (
            <div key={step.title} className="border-t border-white/10 pt-3">
              <div className="text-sm font-semibold">{step.title}</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
                {step.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {project.reportPdf ? (
        <div className="card p-4">
          <h2 className="text-base font-semibold">PDF</h2>
          <a className="link mt-2 inline-block" href={project.reportPdf} target="_blank" rel="noreferrer">
            Télécharger / ouvrir le PDF
          </a>
        </div>
      ) : null}
    </div>
  );
}
