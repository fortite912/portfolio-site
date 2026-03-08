import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const sBadge: Record<string, string> = {
  Done: "pill-green",
  "In progress": "pill-yellow",
  Planned: "pill-accent",
};

const sLabel: Record<string, string> = {
  Done: "Termin\u00e9",
  "In progress": "En cours",
  Planned: "Planifi\u00e9",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card card-hover block overflow-hidden"
    >
      {/* Cover image */}
      {project.cover ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(10,12,16,0.95) 0%, rgba(10,12,16,0.3) 50%, transparent 100%)",
            }}
          />

          {/* badges on image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            {project.category && (
              <span className="pill pill-accent" style={{ fontSize: 11 }}>
                {project.category}
              </span>
            )}
            <span
              className={`pill ${sBadge[project.status] ?? ""}`}
              style={{ fontSize: 11 }}
            >
              {sLabel[project.status] ?? project.status}
            </span>
          </div>
        </div>
      ) : (
        /* fallback gradient si pas de cover */
        <div
          className="h-32"
          style={{
            background:
              "linear-gradient(135deg, rgba(94,187,255,0.1), rgba(155,120,255,0.08))",
          }}
        />
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-[15px] font-semibold leading-snug">
            {project.title}
          </h3>
          <p
            className="mt-1 text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--color-muted)" }}
          >
            {project.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span key={t} className="pill pill-muted" style={{ fontSize: 11 }}>
              {t}
            </span>
          ))}
        </div>

        <span
          className="inline-block text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ color: "var(--color-accent)" }}
        >
          Voir le projet &rarr;
        </span>
      </div>
    </Link>
  );
}
