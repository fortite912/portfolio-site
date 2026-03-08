import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const statusStyle: Record<string, string> = {
  Done: "pill-green",
  "In progress": "pill-yellow",
  Planned: "pill-accent",
};

const statusLabel: Record<string, string> = {
  Done: "Termin\u00e9",
  "In progress": "En cours",
  Planned: "Planifi\u00e9",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card card-hover block no-underline"
    >
      {project.cover && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
            {project.category && (
              <span className="pill pill-accent text-[11px]">
                {project.category}
              </span>
            )}
            <span
              className={`pill text-[11px] ${statusStyle[project.status] ?? ""}`}
            >
              {statusLabel[project.status] ?? project.status}
            </span>
          </div>
        </div>
      )}

      <div className="p-5">
        <h3 className="text-[15px] font-semibold leading-snug text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60 line-clamp-2">
          {project.subtitle}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="pill pill-muted text-[11px]">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm font-medium text-[rgb(var(--accent))] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Voir le projet &rarr;
        </div>
      </div>
    </Link>
  );
}
