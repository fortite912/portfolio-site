import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import type { Metadata } from "next";

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
    title: `Rapport — ${project.title} — Sean Fritsch`,
    description: `Rapport de preuves : ${project.subtitle}`,
  };
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

  return (
    <div className="space-y-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
        <Link href="/projects" className="hover:text-[var(--color-text)] transition-colors">
          Projets
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        <Link href={`/projects/${project.slug}`} className="hover:text-[var(--color-text)] transition-colors">
          {project.title}
        </Link>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        <span style={{ color: "var(--color-text)" }}>Rapport</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <p className="heading-section">Rapport de preuves</p>
          <h1 className="heading-lg">{project.title}</h1>
          <p style={{ color: "var(--color-muted)" }}>
            Procédure reproductible + preuves vérifiables.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link className="btn" href={`/projects/${project.slug}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
            Projet
          </Link>
          <Link className="btn" href="/projects">Liste</Link>
        </div>
      </div>

      {/* Proof checklist */}
      {project.proof?.length ? (
        <section className="card card-glow p-6">
          <div className="flex items-center gap-2 mb-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
            <p className="heading-section" style={{ margin: 0 }}>Preuves attendues</p>
          </div>
          <ul className="space-y-3">
            {project.proof.map((p, i) => (
              <li key={p} className="flex items-start gap-3 animate-in" style={{ animationDelay: `${i * 50}ms` }}>
                <span
                  className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full shrink-0"
                  style={{
                    background: "rgba(52,211,153,0.1)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--color-green)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {p}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Steps */}
      {project.timeline?.length ? (
        <section className="card p-6">
          <p className="heading-section mb-5">Étapes de réalisation</p>
          <div className="space-y-0">
            {project.timeline.map((step, idx) => (
              <div key={`${step.title}-${idx}`} className="step-line pb-5">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.1))",
                      border: "1px solid rgba(96,165,250,0.2)",
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-sm font-semibold">{step.title}</span>
                  {step.badge && (
                    <span className="pill pill-muted ml-auto" style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>
                      {step.badge}
                    </span>
                  )}
                </div>
                {step.details?.length ? (
                  <ul className="mt-2.5 ml-11 space-y-1 text-sm" style={{ color: "var(--color-muted)" }}>
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

      {/* PDF */}
      {project.reportPdf && (
        <section className="card p-6 flex items-center justify-between">
          <div>
            <p className="heading-section mb-1">Document</p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Télécharger le rapport complet au format PDF
            </p>
          </div>
          <a className="btn btn-primary" href={project.reportPdf} target="_blank" rel="noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            PDF
          </a>
        </section>
      )}
    </div>
  );
}
