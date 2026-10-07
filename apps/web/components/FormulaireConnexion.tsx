'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { connexion } from '@/lib/api';
import { ecrireSession } from '@/lib/session';

export default function FormulaireConnexion() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);

  async function soumettre(evenement: FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    setErreur(null);
    setEnCours(true);
    try {
      const utilisateur = await connexion(email, motDePasse);
      ecrireSession({ id: utilisateur.id, role: utilisateur.role, prenom: utilisateur.prenom });
      router.push('/');
    } catch (e) {
      setErreur(e instanceof Error ? e.message : 'Connexion impossible');
    } finally {
      setEnCours(false);
    }
  }

  return (
    <form className="formulaire" onSubmit={soumettre}>
      <div className="champ">
        <label htmlFor="email">Adresse e-mail</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="champ">
        <label htmlFor="motDePasse">Mot de passe</label>
        <input
          id="motDePasse"
          type="password"
          name="motDePasse"
          required
          autoComplete="current-password"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
        />
      </div>
      {erreur && (
        <p className="erreur" role="alert">
          {erreur}
        </p>
      )}
      <button type="submit" className="bouton" disabled={enCours}>
        {enCours ? 'Connexion en cours…' : 'Se connecter'}
      </button>
    </form>
  );
}
