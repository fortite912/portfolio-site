"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useIsEmbed } from "@/components/site-chrome";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateOnScroll({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEmbed = useIsEmbed();

  useEffect(() => {
    // En iframe, l'observateur ne se declencherait jamais pour le bas
    // de page : on rend tout visible d'emblee.
    if (isEmbed) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isEmbed]);

  return (
    <div
      ref={ref}
      className={`aos ${className}`.trim()}
      style={{
        opacity: isEmbed || visible ? 1 : 0,
        transform: isEmbed || visible ? "none" : "translateY(20px) scale(0.98)",
        filter: isEmbed || visible ? "none" : "blur(4px)",
        transition: isEmbed ? "none" : `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
