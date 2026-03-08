import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

const statusStyle: Record<string, { pill: string; label: string }> = {
  Done: { pill: "pill-green", label: "Terminé" },
  "In progress": { pill: "pill-yellow", label: "En cours" },
  Planned: { pill: "pill-accent", label: "Planifié" },
};

export function ProjectCard({ project }: { project: Project }) {
  const st = statusStyle[project.status] ?? { pill: "", label: project.status };

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group card card-hover block overflow-hidden"
      aria-label={`${project.title} — ${st.label}`}
    >
      {/* Cover */}
      {project.cover ? (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,8,13,0.95) 0%, rgba(6,8,13,0.4) 50%, rgba(6,8,13,0.1) 100%)",
            }}
          />
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            {project.category && (
              <span className="pill pill-accent" style={{ fontSize: 11 }}>
                {project.category}
              </span>
            )}
            <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>
              {st.label}
            </span>
          </div>
        </div>
      ) : (
        <div
          className="h-36 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(96,165,250,0.08), rgba(167,139,250,0.06))",
          }}
        >
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            {project.category && (
              <span className="pill pill-accent" style={{ fontSize: 11 }}>
                {project.category}
              </span>
            )}
            <span className={`pill ${st.pill}`} style={{ fontSize: 11 }}>
              {st.label}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
        <div>
          <h3 className="text-[15px] font-semibold leading-snug group-hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </h3>
          <p
            className="mt-1.5 text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--color-muted)" }}
          >
            {project.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[11px] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(255,255,255,0.03)",
                color: "var(--color-muted)",
                border: "1px solid rgba(255,255,255,0.05)",
                fontFamily: "var(--font-mono)",
              }}
            >
              {t}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span
              className="text-[11px] px-2 py-0.5 rounded-md"
              style={{
                background: "rgba(96,165,250,0.06)",
                color: "var(--color-accent)",
                border: "1px solid rgba(96,165,250,0.12)",
                fontFamily: "var(--font-mono)",
              }}
            >
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        <div
          className="flex items-center gap-1.5 text-sm font-medium pt-1 opacity-100 md:opacity-0 transition-all duration-200 md:group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0"
          style={{ color: "var(--color-accent)" }}
        >
          Voir le projet
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
