"use client";

import { useEffect, useState } from "react";

/**
 * Barre de progression de lecture, sur les pages de rapport.
 *
 * Le calcul est throttle par requestAnimationFrame : sans cela, chaque
 * evenement de defilement declenchait un rendu React, ce qui saccadait
 * le scroll sur les pages longues.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      raf = 0;
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      const pct = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
      // Arrondi : evite un rendu pour des variations invisibles
      setProgress(Math.round(pct));
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  if (progress < 1) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[2px]"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, var(--color-accent), var(--color-accent2))",
        boxShadow: "0 0 8px rgba(226,105,60,0.4)",
        transition: "width 0.1s linear",
      }}
    />
  );
}
