import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <div
        className="text-8xl font-bold"
        style={{
          background: "linear-gradient(135deg, var(--color-accent), var(--color-accent2))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "var(--font-mono)",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        404
      </div>
      <div className="space-y-2">
        <h1 className="heading-lg">Page introuvable</h1>
        <p className="text-sm max-w-md" style={{ color: "var(--color-muted)" }}>
          Cette page n&apos;existe pas ou a été déplacée.
          Voici quelques liens utiles :
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
          Projets
        </Link>
        <Link className="btn btn-lg" href="/contact">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Contact
        </Link>
      </div>
    </div>
  );
}
