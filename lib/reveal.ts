/**
 * Filet de sécurité des animations d'apparition au scroll.
 *
 * Les éléments animés partent invisibles et apparaissent quand
 * IntersectionObserver les voit entrer dans la fenêtre — y compris dans
 * une iframe d'un autre domaine (Google Sites) : l'observateur mesure la
 * visibilité par rapport à la fenêtre du navigateur.
 *
 * Si l'observateur ne fonctionnait pas (contexte inattendu), le contenu
 * resterait caché. Détection : IntersectionObserver envoie TOUJOURS une
 * première notification pour chaque élément observé, même hors écran.
 * Si aucune notification n'arrive au bout de FAILSAFE_MS, l'observateur
 * est inopérant ici : on révèle tout.
 *
 * Première version abandonnée : « rien ne s'est révélé en 3 s ». Elle
 * supposait le haut de page visible au chargement — faux dans le Google
 * Site, où l'iframe commence sous la bannière. Le filet s'y déclenchait
 * à tort et supprimait l'animation au scroll.
 */
type Listener = () => void;

const FAILSAFE_MS = 3000;
const listeners = new Set<Listener>();
let observerAlive = false;
let armed = false;
let fired = false;

/** À appeler à chaque notification de l'observateur, visible ou non. */
export function markObserverAlive(): void {
  observerAlive = true;
}

/**
 * S'abonne au « tout révéler » de secours. Retourne la désinscription.
 * Le minuteur est armé une seule fois, au premier abonnement.
 */
export function onRevealAll(fn: Listener): () => void {
  listeners.add(fn);

  if (fired) {
    // Filet déjà déclenché : un élément monté après coup est révélé aussi
    queueMicrotask(fn);
  } else if (!armed && typeof window !== "undefined") {
    armed = true;
    window.setTimeout(() => {
      if (observerAlive) return;
      fired = true;
      listeners.forEach((l) => l());
    }, FAILSAFE_MS);
  }

  return () => {
    listeners.delete(fn);
  };
}
