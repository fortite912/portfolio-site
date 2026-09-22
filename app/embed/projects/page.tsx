import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";

/** Route d'integration : meme contenu que /projects, sans decor de site. */
export const metadata: Metadata = {
  title: "Projets — Sean Fritsch",
  robots: { index: false, follow: false },
};

export default function EmbedProjectsPage() {
  return <ProjectsContent />;
}
