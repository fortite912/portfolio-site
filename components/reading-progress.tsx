"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (progress < 1) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[2px]"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, var(--color-accent), var(--color-accent2))",
        boxShadow: "0 0 8px rgba(96,165,250,0.4)",
        transition: "width 0.1s linear",
      }}
    />
  );
}
