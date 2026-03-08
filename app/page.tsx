// app/page.tsx
import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-10">
      <section className="card p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(SITE.badges ?? []).map((b) => (
            <span key={b} className="pill">{b}</span>
          ))}
        </div>

        <h1 className="h1">{SITE.tagline}</h1>
        <p className="text-white/70">
          Je construis des labs proches du terrain : architecture → configuration → validation → dépannage.
          Chaque projet est livré avec des preuves vérifiables (captures, commandes, tests, checklists).
        </p>

        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-primary" href="/projects">Voir les projets →</Link>
          <Link className="btn" href="/contact">Me contacter</Link>
          <a className="btn" href={SITE.links.cv} target="_blank" rel="noreferrer">Télécharger le CV</a>
        </div>

        <div className="grid gap-2 pt-2">
          {SITE.focus.map((x) => (
            <div key={x.title} className="flex items-center justify-between gap-3">
              <span className="font-semibold">{x.title}</span>
              <span className="text-white/60 text-sm">{x.hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-white/60">À la une</div>
            <div className="h2">Projets “preuve-first”</div>
          </div>
          <Link className="btn" href="/projects">Voir tout ↗</Link>
        </div>

        <div className="grid gap-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
