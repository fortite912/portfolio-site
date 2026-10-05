import { stageSentence } from "@/lib/stage";

/**
 * Présentation affichée en tête de l'intégration Google Sites.
 *
 * Ce texte vivait dans un bloc natif de Google Sites, saisi à la main :
 * il ne suivait pas le code et affichait encore « je recherche un stage »
 * après l'acceptation au Cigref. Servi d'ici, il lit lib/stage.ts et
 * ne peut plus se périmer.
 */
export function EmbedIntro() {
  return (
    <section className="space-y-4 max-w-3xl">
      <p className="heading-section">Présentation</p>
      <p className="text-[15px] leading-relaxed" style={{ color: "rgba(236,232,225,0.88)" }}>
        Étudiant en 2e année de BTS SIO option SISR au Pôle Supérieur Montalembert
        (Courbevoie), en infrastructure, support IT et cybersécurité. {stageSentence()}
      </p>
      <p className="text-[15px] leading-relaxed" style={{ color: "var(--color-muted)" }}>
        Je maîtrise la configuration et le dépannage des réseaux (IP, DNS, DHCP, VLAN) pour
        garantir un service opérationnel. Chaque projet présenté ici est livré avec ses preuves :
        schémas, configurations, procédures de test et résultats attendu/observé.
      </p>
    </section>
  );
}
