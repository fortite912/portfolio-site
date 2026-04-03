import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      {/* Terminal-style error */}
      <div className="terminal w-full max-w-md">
        <div className="terminal-header">
          <span className="terminal-dot" style={{ background: "#ff5f57" }} />
          <span className="terminal-dot" style={{ background: "#febc2e" }} />
          <span className="terminal-dot" style={{ background: "#28c840" }} />
          <span className="text-[11px] ml-2" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
            error.log
          </span>
        </div>
        <div className="terminal-body text-center py-8 space-y-3">
          <div
            className="text-6xl font-bold"
            style={{
              background: "linear-gradient(135deg, var(--color-accent), var(--color-accent2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-mono)",
            }}
          >
            404
          </div>
          <p className="text-sm" style={{ color: "var(--color-red)" }}>
            ERROR: page_not_found
          </p>
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            La route demandée n&apos;existe pas dans ce portfolio.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h1 className="heading-lg">Page introuvable</h1>
        <p className="text-sm max-w-md" style={{ color: "var(--color-muted)" }}>
          Peut-être un lien cassé ou une URL mal tapée.
          Voici quelques destinations utiles :
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link className="btn btn-primary btn-lg" href="/">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Accueil
        </Link>
        <Link className="btn btn-lg" href="/projects">
          Projets
        </Link>
        <Link className="btn btn-lg" href="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
}
