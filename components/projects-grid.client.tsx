"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";

const CATS = ["Tous", "Syst\u00e8mes", "R\u00e9seau", "Cloud", "Preuves"] as const;

export function ProjectsGridClient({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("Tous");

  const list =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`pill cursor-pointer transition-all ${
              active === c ? "pill-accent" : ""
            }`}
            style={active === c ? {} : { opacity: 0.6 }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center py-12" style={{ color: "var(--color-muted)" }}>
          Aucun projet dans cette cat&eacute;gorie.
        </p>
      )}
    </div>
  );
}
