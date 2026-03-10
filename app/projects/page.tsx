import type { Metadata } from "next";
import { getProjects } from "@/lib/projects";
import { ProjectsGridClient } from "@/components/projects-grid.client";

export const metadata: Metadata = {
  title: "Projets — Sean Fritsch",
  description: "Labs documentés avec objectifs, configuration, validations et preuves reproductibles.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const done = projects.filter((p) => p.status === "Done").length;
  const inProgress = projects.filter((p) => p.status === "In progress").length;

  return (
    <div className="space-y-10">
      <header className="space-y-6">
        <div className="space-y-3">
          <p className="heading-section">Portfolio</p>
          <h1 className="heading-lg">Tous les projets</h1>
          <p className="text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            Labs documentés avec objectifs, configuration, validations et preuves reproductibles.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Total</span>
            <span className="font-bold" style={{ color: "var(--color-accent)" }}>{projects.length}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{
              background: "rgba(52,211,153,0.04)",
              border: "1px solid rgba(52,211,153,0.1)",
            }}
          >
            <span style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>Terminés</span>
            <span className="font-bold" style={{ color: "var(--color-green)" }}>{done}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
            style={{
              background: "rgba(251,191,36,0.04)",
              border: "1px solid rgba(251,191,36,0.1)",
            }}
          >
            <span style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 12 }}>En cours</span>
            <span className="font-bold" style={{ color: "var(--color-yellow)" }}>{inProgress}</span>
          </div>
        </div>
      </header>
      <ProjectsGridClient projects={projects} />
    </div>
  );
}
