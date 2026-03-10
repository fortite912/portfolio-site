import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import type { Metadata } from "next";
import { ReadingProgress } from "@/components/reading-progress";

export async function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Sean Fritsch`,
    description: project.subtitle,
  };
}

const statusStyle: Record<string, { pill: string; label: string }> = {
  Done: { pill: "pill-green", label: "Terminé" },
  "In progress": { pill: "pill-yellow", label: "En cours" },
  Planned: { pill: "pill-accent", label: "Planifié" },
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  const st = statusStyle[project.status] ?? { pill: "", label: project.status };

  return (
    <div className="space-y-10">
      <ReadingProgress />
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
        <Link href="/projects" className="hover:text-[var(--color-text)] transition-colors">
          Projets
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        <span style={{ color: "var(--color-text)" }}>{project.title}</span>
      </nav>

      {/* Cover */}
      {project.cover && (
        <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            className="object-cover"
            sizes="1120px"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(6,8,13,0.98) 0%, rgba(6,8,13,0.4) 40%, rgba(6,8,13,0.15) 100%)",
            }}
          />
          {/* Floating badges on cover */}
          <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between">
            <h1 className="heading-lg text-white drop-shadow-lg">{project.title}</h1>
            <span className={`pill ${st.pill}`}>{st.label}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div className="space-y-3">
          <h1 className="heading-lg">{project.title}</h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: "var(--color-muted)" }}>
            {project.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {project.category && <span className="pill pill-accent">{project.category}</span>}
            <span className={`pill ${st.pill}`}>{st.label}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <Link className="btn btn-primary" href={`/projects/${project.slug}/report`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
            Rapport
          </Link>
          {project.pdf && (
            <a className="btn" href={project.pdf} target="_blank" rel="noreferrer">PDF</a>
          )}
        </div>
      </div>

      {/* Objective */}
      <section className="card card-glow p-6">
        <p className="heading-section mb-3">Objectif</p>
        <p className="leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
          {project.objective}
        </p>
      </section>

      {/* Info grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {project.stack?.length ? (
          <div className="card p-5">
            <p className="heading-section mb-3">Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1 rounded-md"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: "var(--font-mono)",
                    color: "var(--color-muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="card p-5">
          <p className="heading-section mb-3">Méthode</p>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {project.method.map((m, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--color-accent)" }} />
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <p className="heading-section mb-3">Validation</p>
          <ul className="space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>
            {project.validation.map((v, i) => (
              <li key={i} className="flex gap-2.5 items-start">
                <svg className="mt-0.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {v}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline */}
      {project.timeline?.length ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="heading-section">Timeline</p>
            <span className="text-[11px] font-medium" style={{ color: "var(--color-accent)", fontFamily: "var(--font-mono)" }}>
              {project.timeline.length}/{project.timeline.length} étapes
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: project.status === "Done" ? "100%" : project.status === "In progress" ? "60%" : "0%" }}
            />
          </div>
          <div className="space-y-3">
            {project.timeline.map((step, idx) => (
              <div key={`${step.title}-${idx}`} className="card p-5 step-line">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.1))",
                        border: "1px solid rgba(96,165,250,0.2)",
                        color: "var(--color-accent)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{step.title}</span>
                  </div>
                  {step.badge && (
                    <span className="pill pill-muted" style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.details?.length ? (
                  <ul className="mt-3 ml-11 space-y-1 text-sm" style={{ color: "var(--color-muted)" }}>
                    {step.details.map((d, i) => (
                      <li key={`${d}-${i}`} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Deliverables */}
      <section className="card p-6">
        <p className="heading-section mb-3">Livrables</p>
        <div className="flex flex-wrap gap-2">
          {project.deliverables.map((d) => (
            <span key={d} className="pill">{d}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
