// components/projects-grid.client.tsx
"use client";

import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";

export function ProjectsGridClient({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}
