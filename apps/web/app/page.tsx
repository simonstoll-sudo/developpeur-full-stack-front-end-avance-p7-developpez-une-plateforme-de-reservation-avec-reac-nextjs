import CarteLogement from '@/components/CarteLogement';
import { getLogements } from '@/lib/api';

export default async function PageAccueil() {
  const logements = await getLogements();

  return (
    <>
      <h1>Nos logements</h1>
      <ul className="grille-logements">
        {logements.map((logement) => (
          <CarteLogement key={logement.id} logement={logement} />
        ))}
      </ul>
    </>
  );
}
