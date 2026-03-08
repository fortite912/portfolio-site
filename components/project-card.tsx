import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:bg-white/[0.05] transition"
    >
      <div className="relative h-40">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-white font-semibold leading-snug">{project.title}</div>
            <div className="text-white/70 text-sm mt-1">{project.subtitle}</div>
          </div>
          <div className="text-xs text-white/70 whitespace-nowrap">
            {project.year} • {project.statusLabel}
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((t) => (
            <span
              key={t}
              className="px-2 py-1 rounded-full text-[11px] border border-white/10 bg-white/5 text-white/70"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-cyan-300/90 group-hover:text-cyan-200 transition">
          Ouvrir →
        </div>
      </div>
    </Link>
  );
}
