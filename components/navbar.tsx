// components/navbar.tsx
import Link from "next/link";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/certifications", label: "Certifs" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold">{SITE.name}</div>
          <div className="truncate text-xs text-white/70">{SITE.role}</div>
        </div>

        <nav className="flex items-center gap-2">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="btn btn-ghost">
              {i.label}
            </Link>
          ))}
          <Link href={SITE.links.cv} className="btn btn-primary">
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
