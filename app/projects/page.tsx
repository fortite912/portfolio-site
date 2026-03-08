import { getProjects } from "@/lib/projects";
import { ProjectsGridClient } from "@/components/projects-grid.client";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="h1 text-3xl">Projets</h1>
        <p className="text-white/55">
          TPs document&eacute;s : objectifs &rarr; config &rarr; validations
          &rarr; preuves.
        </p>
      </header>

      <ProjectsGridClient projects={projects} />
    </div>
  );
}
