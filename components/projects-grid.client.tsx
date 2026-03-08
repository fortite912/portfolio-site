"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";

const CATEGORIES = ["Tous", "Syst\u00e8mes", "R\u00e9seau", "Cloud", "Preuves"] as const;

export function ProjectsGridClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("Tous");

  const filtered =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`pill cursor-pointer transition-colors ${
              active === cat ? "pill-accent" : "hover:bg-white/8"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-white/50 py-8">
          Aucun projet dans cette cat&eacute;gorie.
        </p>
      )}
    </div>
  );
}
