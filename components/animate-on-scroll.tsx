"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { markObserverAlive, onRevealAll } from "@/lib/reveal";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Apparition au scroll (fondu, léger glissé et net).
 * Actif partout, y compris dans le Google Sites via /embed/* :
 * IntersectionObserver fonctionne à travers l'iframe. Filet de sécurité
 * dans lib/reveal.ts ; mouvement réduit respecté en CSS (.aos).
 */
export function AnimateOnScroll({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toute notification, meme hors ecran, prouve que l'observateur
        // fonctionne : le filet de securite ne doit pas se declencher.
        markObserverAlive();
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      // rootMargin est ignoré dans une iframe d'un autre domaine : sans
      // conséquence, le seuil suffit à déclencher l'apparition.
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);

    const unsubscribe = onRevealAll(() => setVisible(true));
    return () => {
      observer.disconnect();
      unsubscribe();
    };
  }, []);

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  return (
    <div
      ref={ref}
      className={`aos ${className}`.trim()}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px) scale(0.98)",
        filter: visible ? "none" : "blur(4px)",
        transition: `opacity 0.7s ${ease} ${delay}ms, transform 0.7s ${ease} ${delay}ms, filter 0.7s ${ease} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
