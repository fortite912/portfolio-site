"use client";

import { useEffect } from "react";

/**
 * Effets qui suivent le curseur :
 * - .btn            : reflet (--x, --y en pourcentage)
 * - .card-spotlight : halo radial (--mouse-x, --mouse-y en pixels)
 *
 * Un seul écouteur délégué sur document, throttlé par
 * requestAnimationFrame : un calcul par frame au maximum, et les éléments
 * ajoutés dynamiquement fonctionnent sans rebranchement.
 * Non monté sur les routes /embed/* (voir SiteChrome).
 */
export function CursorGlow() {
  useEffect(() => {
    let raf = 0;
    let last: MouseEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const btn = target.closest<HTMLElement>(".btn");
      if (btn) {
        const r = btn.getBoundingClientRect();
        if (r.width && r.height) {
          btn.style.setProperty("--x", `${((e.clientX - r.left) / r.width) * 100}%`);
          btn.style.setProperty("--y", `${((e.clientY - r.top) / r.height) * 100}%`);
        }
      }

      const card = target.closest<HTMLElement>(".card-spotlight");
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
      }
    };

    const onMove = (e: MouseEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      document.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
