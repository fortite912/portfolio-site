import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div
        className="text-7xl font-bold"
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
      <div className="space-y-2">
        <h1 className="heading-lg">Page introuvable</h1>
        <p className="text-sm max-w-md" style={{ color: "var(--color-muted)" }}>
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <Link className="btn btn-primary btn-lg" href="/">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
