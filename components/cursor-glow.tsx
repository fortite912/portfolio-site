"use client";

import { useEffect } from "react";

/**
 * Cursor-following glow sur les éléments .btn.
 * Définit les propriétés CSS --x et --y utilisées par le pseudo-élément .btn::after.
 *
 * Délégation : un seul écouteur sur document, donc les boutons ajoutés
 * dynamiquement fonctionnent sans avoir à rebrancher quoi que ce soit.
 */
export function CursorGlow() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest<HTMLElement>(".btn");
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty("--x", `${x}%`);
      btn.style.setProperty("--y", `${y}%`);
    };

    document.addEventListener("mousemove", handler, { passive: true });
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  return null;
}
