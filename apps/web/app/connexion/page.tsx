import type { Metadata } from 'next';
import FormulaireConnexion from '@/components/FormulaireConnexion';

export const metadata: Metadata = {
  title: 'Connexion – Kasa',
};

export default function PageConnexion() {
  return (
    <section>
      <h1>Connexion</h1>
      <FormulaireConnexion />
    </section>
  );
}
