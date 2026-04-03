"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
}

export function CountUp({ value, duration = 1800 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  const [trigger, setTrigger] = useState(0);

  // Extract numeric part and suffix (e.g. "15+" -> 15, "+")
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const animate = useCallback(() => {
    const startTime = performance.now();
    let raf: number;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      setDisplay(String(current));

      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  // Initial trigger on scroll into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && trigger === 0) {
          setTrigger(1);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  // Run animation whenever trigger changes
  useEffect(() => {
    if (trigger === 0) return;
    return animate();
  }, [trigger, animate]);

  // Re-animate on hover
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
