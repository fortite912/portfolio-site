// components/footer.tsx
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/70">
          © {new Date().getFullYear()} {SITE.name} — Portfolio SISR
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          <a className="link" href={SITE.links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="link" href={SITE.links.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="link" href={`mailto:${SITE.links.email}`}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
