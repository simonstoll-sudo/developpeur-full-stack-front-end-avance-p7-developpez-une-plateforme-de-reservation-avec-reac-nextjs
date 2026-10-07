import type { SessionUtilisateur } from './types';

const CLE_SESSION = 'kasa_utilisateur';
const EVENEMENT_SESSION = 'kasa:session';

let derniereValeurBrute: string | null = null;
let derniereSession: SessionUtilisateur | null = null;

function analyser(brut: string | null): SessionUtilisateur | null {
  if (!brut) return null;
  try {
    return JSON.parse(brut) as SessionUtilisateur;
  } catch {
    return null;
  }
}

/**
 * Lit la session courante depuis le localStorage.
 * Renvoie le même objet tant que la valeur stockée n'a pas changé, ce qui permet
 * de l'utiliser comme instantané avec useSyncExternalStore.
 */
export function lireSession(): SessionUtilisateur | null {
  if (typeof window === 'undefined') return null;
  const brut = window.localStorage.getItem(CLE_SESSION);
  if (brut !== derniereValeurBrute) {
    derniereValeurBrute = brut;
    derniereSession = analyser(brut);
  }
  return derniereSession;
}

export function ecrireSession(session: SessionUtilisateur): void {
  window.localStorage.setItem(CLE_SESSION, JSON.stringify(session));
  window.dispatchEvent(new Event(EVENEMENT_SESSION));
}

export function effacerSession(): void {
  window.localStorage.removeItem(CLE_SESSION);
  window.dispatchEvent(new Event(EVENEMENT_SESSION));
}

/**
 * Prévient l'abonné à chaque changement de session, dans cet onglet ou dans un autre.
 * Renvoie la fonction de désabonnement.
 */
export function sabonnerSession(callback: () => void): () => void {
  window.addEventListener(EVENEMENT_SESSION, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENEMENT_SESSION, callback);
    window.removeEventListener('storage', callback);
  };
}
