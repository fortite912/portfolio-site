import { getProjects } from "@/lib/projects";
import { ProjectsGridClient } from "@/components/projects-grid.client";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="heading-section">Portfolio</p>
        <h1 className="heading-lg">Tous les projets</h1>
        <p className="text-[15px] max-w-xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
          Labs documentés avec objectifs, configuration, validations et preuves reproductibles.
        </p>
      </header>
      <ProjectsGridClient projects={projects} />
    </div>
  );
}
