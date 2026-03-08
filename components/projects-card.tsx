// components/project-card.tsx
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-white/70">{project.subtitle}</p>
        </div>
        <div className="shrink-0 text-right">
          <div className="pill">{project.year}</div>
          <div className="mt-2 text-xs text-white/60">{project.statusLabel}</div>
        </div>
      </div>

      <p className="mt-3 text-sm text-white/80">{project.summary}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="pill">{project.category}</span>
        {project.tags.slice(0, 4).map((t) => (
          <span key={t} className="pill pill-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Link className="btn btn-primary" href={`/projects/${project.slug}`}>
          Ouvrir →
        </Link>
        <Link className="btn" href={`/projects/${project.slug}/report`}>
          Rapport
        </Link>
      </div>
    </article>
  );
}
