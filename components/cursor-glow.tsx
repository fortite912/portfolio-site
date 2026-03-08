"use client";

import { useEffect } from "react";

/**
 * Wires up cursor-following glow on all .btn elements.
 * Sets --x and --y CSS custom properties used by the .btn::after pseudo-element.
 * Mount once in the layout — no render output.
 */
export function CursorGlow() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty("--x", `${x}%`);
      target.style.setProperty("--y", `${y}%`);
    };

    const attach = () => {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        btn.addEventListener("mousemove", handler as EventListener);
      });
    };

    const detach = () => {
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        btn.removeEventListener("mousemove", handler as EventListener);
      });
    };

    // Attach immediately + re-attach on route changes via MutationObserver
    attach();

    const observer = new MutationObserver(() => {
      detach();
      attach();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      detach();
      observer.disconnect();
    };
  }, []);

  return null;
}
