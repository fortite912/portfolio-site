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
    <header
      className="sticky top-0 z-40 backdrop-blur-xl"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,12,16,0.82)",
      }}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 h-14">
        <Link href="/" className="flex flex-col gap-0.5">
          <span className="text-sm font-bold tracking-tight">{SITE.name}</span>
          <span className="text-[11px] text-[var(--color-muted)]">
            {SITE.role}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="btn-ghost btn text-[13px] h-8 px-3"
            >
              {i.label}
            </Link>
          ))}
          <Link className="btn btn-primary text-[13px] h-8 px-3 ml-1" href={SITE.links.cv}>
            CV
          </Link>
        </nav>
      </div>
    </header>
  );
}
