"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { markObserverAlive, onRevealAll } from "@/lib/reveal";

interface CountUpProps {
  value: string;
  duration?: number;
}

/**
 * Compteur animé au scroll ("92%" compte de 0 à 92).
 * Actif partout, y compris dans le Google Sites via /embed/*.
 * Filet de sécurité partagé avec AnimateOnScroll (lib/reveal.ts) ; en
 * mouvement réduit, la valeur finale s'affiche dès la première frame.
 */
export function CountUp({ value, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [trigger, setTrigger] = useState(0);

  // Partie numérique et suffixe ("15+" -> 15, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const animate = useCallback(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 0 : duration;
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const progress = total > 0 ? Math.min((now - startTime) / total, 1) : 1;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  // Déclenchement à l'entrée dans la fenêtre
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        markObserverAlive();
        if (entry.isIntersecting && trigger === 0) {
          setTrigger(1);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    const unsubscribe = onRevealAll(() => setTrigger((t) => (t === 0 ? 1 : t)));
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, [trigger]);

  useEffect(() => {
    if (trigger === 0) return;
    return animate();
  }, [trigger, animate]);

  // Rejoue l'animation au survol
  const handleHover = () => {
    if (trigger > 0) {
      setDisplay("0");
      setTrigger((t) => t + 1);
    }
  };

  return (
    <span ref={ref} onMouseEnter={handleHover} className="cursor-default">
      {display}
      {suffix}
    </span>
  );
}
