import type { NextConfig } from "next";

/**
 * En-têtes de sécurité appliqués à toutes les réponses.
 *
 * Volontairement SANS X-Frame-Options ni frame-ancestors : le portfolio
 * est intégré en iframe dans le Google Sites (routes /embed/*), un
 * cadrage restrictif casserait cette consultation. Le durcissement du
 * framing passera par une CSP frame-ancestors ciblant Google Sites,
 * après test contre l'intégration réelle (voir docs/tp-securite-web.md).
 */
const securityHeaders = [
  // Empêche le navigateur de « deviner » un type MIME (anti-sniffing)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Ne transmet l'URL complète qu'en navigation interne
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Coupe les API sensibles dont le site n'a aucun besoin
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
