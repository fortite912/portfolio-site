"use client";

import { usePathname } from "next/navigation";

/**
 * Decide si le decor de site doit etre rendu.
 * Les routes /embed/* sont destinees a l'affichage en iframe : on y
 * supprime barre de navigation, pied de page, fonds decoratifs et
 * comportements couteux, pour un rendu statique et leger.
 */
export function useIsEmbed() {
  const pathname = usePathname();
  return pathname.startsWith("/embed");
}

/** N'affiche ses enfants que hors mode integration. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return useIsEmbed() ? null : <>{children}</>;
}
