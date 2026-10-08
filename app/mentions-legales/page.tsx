import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — Sean Fritsch",
  description:
    "Éditeur, hébergeur, données personnelles et crédits du portfolio de Sean Fritsch.",
  robots: { index: false, follow: true },
};

const REPO = "https://github.com/fortite912/portfolio-site";

/**
 * Mentions légales d'un site personnel édité à titre non professionnel.
 * La loi pour la confiance dans l'économie numérique (art. 6-III-2)
 * permet à une personne physique de ne pas publier son adresse dès lors
 * que l'hébergeur est identifié : c'est le choix fait ici.
 */
export default function MentionsLegalesPage() {
  const blocks: Array<{ title: string; body: React.ReactNode }> = [
    {
      title: "Éditeur",
      body: (
        <>
          <p>
            {SITE.name}, étudiant en BTS Services informatiques aux organisations, option SISR.
            Site personnel, édité à titre non professionnel.
          </p>
          <p>
            Contact :{" "}
            <a className="link-underline" href={`mailto:${SITE.links.email}`}>
              {SITE.links.email}
            </a>
          </p>
        </>
      ),
    },
    {
      title: "Hébergement",
      body: (
        <p>
          Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis —{" "}
          <a className="link-underline" href="https://vercel.com" target="_blank" rel="noreferrer">
            vercel.com
          </a>
          .
        </p>
      ),
    },
    {
      title: "Données personnelles",
      body: (
        <>
          <p>
            Le site ne dépose aucun cookie, n&rsquo;embarque aucun outil de mesure
            d&rsquo;audience et ne propose aucun formulaire : il ne collecte pas de données
            personnelles. Les polices sont servies depuis le site lui-même, sans requête vers un
            tiers.
          </p>
          <p>
            L&rsquo;hébergeur conserve les journaux techniques nécessaires au fonctionnement du
            service (adresse IP, pages consultées). Le flux de veille est lu par le serveur depuis
            GitHub, pas depuis votre navigateur.
          </p>
        </>
      ),
    },
    {
      title: "Confidentialité des stages",
      body: (
        <p>
          Les rapports de stage sont confidentiels. Aucune donnée interne, procédure, nom de
          collègue ou incident précis des organisations d&rsquo;accueil n&rsquo;est publié ici :
          seules les missions, dans leurs grandes lignes, sont décrites.
        </p>
      ),
    },
    {
      title: "Propriété intellectuelle",
      body: (
        <>
          <p>
            Textes, schémas, configurations et captures : © {SITE.name}. Le code source du site
            est consultable sur{" "}
            <a className="link-underline" href={REPO} target="_blank" rel="noreferrer">
              GitHub
            </a>
            .
          </p>
          <p>
            Illustrations décoratives générées par IA (Gemini) à partir de mes consignes. Polices
            IBM Plex Sans et IBM Plex Mono, sous licence SIL Open Font License.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="space-y-10 max-w-2xl">
      <header className="space-y-3">
        <p className="heading-section">Mentions légales</p>
        <h1 className="heading-lg">Qui édite ce site, et comment</h1>
      </header>

      <div className="space-y-6">
        {blocks.map((b) => (
          <section key={b.title} className="card p-5 sm:p-6 space-y-3">
            <h2
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "var(--color-muted)" }}
            >
              {b.title}
            </h2>
            <div
              className="space-y-2 text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              {b.body}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
