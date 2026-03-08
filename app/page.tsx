import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="card p-8 md:p-10 space-y-6">
        <div className="flex flex-wrap gap-2">
          {(SITE.badges ?? []).map((b) => (
            <span key={b} className="pill pill-accent">
              {b}
            </span>
          ))}
        </div>

        <h1 className="h1 max-w-3xl">{SITE.tagline}</h1>

        <p className="text-white/60 max-w-2xl leading-relaxed">
          Je construis des labs proches du terrain : architecture &rarr;
          configuration &rarr; validation &rarr; d&eacute;pannage. Chaque projet
          est livr&eacute; avec des preuves v&eacute;rifiables (captures,
          commandes, tests, checklists).
        </p>

        <div className="flex flex-wrap gap-3">
          <Link className="btn btn-primary" href="/projects">
            Voir les projets &rarr;
          </Link>
          <Link className="btn" href="/contact">
            Me contacter
          </Link>
          <a
            className="btn"
            href={SITE.links.cv}
            target="_blank"
            rel="noreferrer"
          >
            T&eacute;l&eacute;charger le CV
          </a>
        </div>
      </section>

      {/* Focus areas */}
      <section className="space-y-4">
        <h2 className="h2">Approche &ldquo;preuve-first&rdquo;</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {SITE.focus.map((x) => (
            <div key={x.title} className="card p-5">
              <div className="text-sm font-semibold text-[rgb(var(--accent))]">
                {x.title}
              </div>
              <div className="mt-1 text-sm text-white/55">{x.hint}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <h2 className="h2">&Agrave; la une</h2>
          <Link className="btn text-sm" href="/projects">
            Tout voir &rarr;
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
