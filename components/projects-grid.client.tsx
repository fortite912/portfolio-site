"use client";

import { useState } from "react";
import type { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";

const CATS = ["Tous", "Systèmes", "Réseau", "Cloud", "Preuves"] as const;

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
        {CATS.map((c) => {
          const count = c === "Tous" ? projects.length : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 inline-flex items-center gap-1.5"
              style={{
                background:
                  active === c ? "rgba(96,165,250,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  active === c ? "rgba(96,165,250,0.2)" : "rgba(255,255,255,0.06)"
                }`,
                color:
                  active === c ? "var(--color-accent)" : "var(--color-muted)",
              }}
            >
              {c}
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full"
                style={{
                  background: active === c ? "rgba(96,165,250,0.15)" : "rgba(255,255,255,0.06)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {list.map((p, i) => (
          <div
            key={p.slug}
            className="animate-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <ProjectCard project={p} />
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-16">
          <svg className="mx-auto mb-2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <p className="text-sm" style={{ color: "var(--color-muted)" }}>
            Aucun projet dans cette catégorie.
          </p>
        </div>
      )}
    </div>
  );
}
