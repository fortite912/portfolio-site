// app/projects/page.tsx
import { getProjects } from "@/lib/projects";
import { ProjectsGridClient } from "@/components/projects-grid.client";

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold">Projets</h1>
        <p className="text-white/70">TPs documentés : objectifs → config → validations → preuves.</p>
      </header>

      <ProjectsGridClient projects={projects} />
    </div>
  );
}
