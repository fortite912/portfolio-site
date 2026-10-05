"use client";

import { useEffect } from "react";
import { useIsEmbed } from "@/components/site-chrome";

/**
 * Liens internes dans le Google Site.
 *
 * Dans une integration, un lien vers /certifications ou /projects/...
 * chargeait la page complete du portfolio A L'INTERIEUR du cadre Google
 * Sites, barre de navigation comprise. Sur les routes /embed/*, ces liens
 * s'ouvrent dans un nouvel onglet. Les ancres de la page (#ccf...) restent
 * dans le cadre : le sommaire continue de faire defiler la page.
 *
 * Phase de capture : le gestionnaire passe avant celui de next/link, qui
 * sinon naviguerait dans le cadre.
 */
export function EmbedLinks() {
  const isEmbed = useIsEmbed();

  useEffect(() => {
    if (!isEmbed) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank") return;

      const url = new URL(a.href, window.location.href);
      const memePage =
        url.origin === window.location.origin && url.pathname === window.location.pathname;
      if (memePage && url.hash) return; // ancre : defilement dans le cadre

      e.preventDefault();
      e.stopPropagation();
      window.open(url.href, "_blank", "noopener");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [isEmbed]);

  return null;
}
