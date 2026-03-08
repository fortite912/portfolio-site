import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto flex max-w-[1100px] flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-[var(--color-muted)]">
          &copy; {new Date().getFullYear()} {SITE.name} &mdash; Portfolio SISR
        </p>

        <div className="flex gap-4 text-xs">
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
