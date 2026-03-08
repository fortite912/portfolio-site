import { getProjects } from "@/lib/projects";
import { ProjectsGridClient } from "@/components/projects-grid.client";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <p className="heading-section">Portfolio</p>
        <h1 className="heading-lg">Projets</h1>
        <p style={{ color: "var(--color-muted)" }} className="text-[15px]">
          TPs document&eacute;s : objectifs &rarr; config &rarr; validations
          &rarr; preuves.
        </p>
      </header>

      <ProjectsGridClient projects={projects} />
    </div>
  );
}
