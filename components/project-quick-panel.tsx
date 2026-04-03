// components/project-quick-panel.tsx
"use client";

import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectQuickPanel({ projects }: { projects: Project[] }) {
  const active = projects[0];

  if (!active) return null;

  return (
    <div className="card p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">À la une</div>
      <div className="mt-2 text-sm font-semibold">{active.title}</div>
      <div className="mt-1 text-sm text-white/70">{active.subtitle}</div>

      <div className="mt-3 flex flex-wrap gap-2">
        <span className="pill">{active.category}</span>
        {active.tags.slice(0, 4).map((t) => (
          <span key={t} className="pill pill-muted">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <Link className="btn btn-primary" href={`/projects/${active.slug}`}>
          Ouvrir →
        </Link>
        <Link className="btn" href={`/projects/${active.slug}/report`}>
          Rapport
        </Link>
      </div>
    </div>
  );
}
