import Link from 'next/link';
import { getLogement } from '@/lib/api';

interface PageLogementProps {
  params: Promise<{ id: string }>;
}

export default async function PageLogement({ params }: PageLogementProps) {
  const { id } = await params;
  const logement = await getLogement(id);

  return (
    <article className="detail-logement">
      <Link href="/" className="lien-retour">
        ← Retour aux logements
      </Link>
      <h1>{logement.titre}</h1>
      <p className="detail-meta">
        {logement.typeLogement} · {logement.ville}
      </p>
      <p className="prix">{logement.prixParNuit} € / nuit</p>
      {logement.hote && <p>Proposé par {logement.hote.prenom}</p>}
    </article>
  );
}
