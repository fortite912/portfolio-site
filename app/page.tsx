import Link from "next/link";
import { SITE } from "@/lib/site";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-16">
      {/* ===== Hero ===== */}
      <section className="card overflow-hidden">
        {/* top glow bar */}
        <div
          className="h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent), var(--color-accent2), transparent)",
          }}
        />

        <div className="p-8 md:p-12 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {(SITE.badges ?? []).map((b) => (
              <span key={b} className="pill pill-accent">
                {b}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <h1 className="heading-xl text-gradient max-w-3xl">
            {SITE.tagline}
          </h1>

          {/* Intro */}
          <p
            className="max-w-2xl leading-relaxed text-[15px]"
            style={{ color: "var(--color-muted)" }}
          >
            Je construis des labs proches du terrain : architecture &rarr;
            configuration &rarr; validation &rarr; d&eacute;pannage. Chaque
            projet est livr&eacute; avec des preuves v&eacute;rifiables.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 pt-2">
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
        </div>
      </section>

      {/* ===== Focus areas ===== */}
      <section className="space-y-5">
        <p className="heading-section">Approche</p>
        <h2 className="heading-lg">Preuves avant tout</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SITE.focus.map((f, i) => (
            <div
              key={f.title}
              className="card p-5 animate-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--color-accent)" }}
              >
                {f.title}
              </p>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                {f.hint}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Featured projects ===== */}
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="heading-section">S&eacute;lection</p>
            <h2 className="heading-lg mt-1">&Agrave; la une</h2>
          </div>
          <Link className="btn text-sm" href="/projects">
            Tout voir &rarr;
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div
              key={p.slug}
              className="animate-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
