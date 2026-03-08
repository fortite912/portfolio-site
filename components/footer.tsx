import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/8">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-4 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/50">
          &copy; {new Date().getFullYear()} {SITE.name} &mdash; Portfolio SISR
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <a
            className="link"
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="link"
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          {SITE.links.email && (
            <a className="link" href={`mailto:${SITE.links.email}`}>
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
