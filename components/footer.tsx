import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-bold"
            style={{
              background: "linear-gradient(135deg, rgba(96,165,250,0.12), rgba(167,139,250,0.12))",
              border: "1px solid rgba(96,165,250,0.15)",
              color: "var(--color-accent)",
            }}
          >
            SF
          </div>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            &copy; {new Date().getFullYear()} {SITE.name} &mdash; Portfolio SISR
          </p>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <a
            className="transition-colors hover:text-[var(--color-text)]"
            style={{ color: "var(--color-muted)" }}
            href={SITE.links.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            className="transition-colors hover:text-[var(--color-text)]"
            style={{ color: "var(--color-muted)" }}
            href={SITE.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          {SITE.links.email && (
            <a
              className="transition-colors hover:text-[var(--color-text)]"
              style={{ color: "var(--color-muted)" }}
              href={`mailto:${SITE.links.email}`}
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
