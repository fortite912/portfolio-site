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
    <header className="sticky top-0 z-40 border-b border-white/8 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-4 py-3">
        <Link href="/" className="min-w-0 no-underline">
          <div className="truncate text-sm font-semibold text-white">
            {SITE.name}
          </div>
          <div className="truncate text-xs text-white/50">{SITE.role}</div>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className="btn btn-ghost text-sm">
              {i.label}
            </Link>
          ))}
          <Link href={SITE.links.cv} className="btn btn-primary text-sm ml-1">
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
