"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE } from "@/lib/site";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/projects", label: "Projets" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className="sticky top-0 z-40 relative"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(6,8,13,0.85)",
        backdropFilter: "blur(20px) saturate(1.5)",
      }}
    >
      <div className="mx-auto flex max-w-[1120px] items-center justify-between px-5 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg text-sm font-bold"
            style={{
              background:
                "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(167,139,250,0.15))",
              border: "1px solid rgba(96,165,250,0.2)",
              color: "var(--color-accent)",
            }}
          >
            SF
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight">{SITE.name}</span>
            <span
              className="text-[10px] font-medium tracking-wider uppercase"
              style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
            >
              {SITE.role}
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="relative text-[13px] font-medium h-8 px-3.5 rounded-lg flex items-center transition-all"
              style={{
                color: isActive(i.href)
                  ? "var(--color-text)"
                  : "var(--color-muted)",
                background: isActive(i.href)
                  ? "rgba(255,255,255,0.06)"
                  : "transparent",
              }}
            >
              {i.label}
              {isActive(i.href) && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--color-accent), var(--color-accent2))",
                  }}
                />
              )}
            </Link>
          ))}
          <a
            className="btn btn-primary text-[13px] h-8 px-3.5 ml-2"
            href={SITE.links.cv}
            target="_blank"
            rel="noreferrer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CV
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
            style={{
              background: "var(--color-text)",
              transform: open ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
            style={{
              background: "var(--color-text)",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-[1.5px] rounded-full transition-all duration-300"
            style={{
              background: "var(--color-text)",
              transform: open ? "translateY(-6.5px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-5 pb-5 animate-fade"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <nav className="flex flex-col gap-1 pt-3">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium py-2.5 px-3 rounded-lg transition-colors"
                style={{
                  color: isActive(i.href) ? "var(--color-text)" : "var(--color-muted)",
                  background: isActive(i.href) ? "rgba(255,255,255,0.06)" : "transparent",
                }}
              >
                {i.label}
              </Link>
            ))}
            <a
              className="btn btn-primary text-sm mt-2"
              href={SITE.links.cv}
              target="_blank"
              rel="noreferrer"
            >
              Télécharger le CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
