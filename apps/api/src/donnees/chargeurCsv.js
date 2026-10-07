import { readFile } from 'node:fs/promises';

const SEPARATEUR = ',';

/**
 * Découpe une ligne du CSV en valeurs. Le fichier de données n'utilise ni guillemets
 * ni virgules dans ses valeurs : un découpage simple suffit.
 */
function decouperLigne(ligne) {
  return ligne.split(SEPARATEUR).map((valeur) => valeur.trim());
}

function versUtilisateur(enregistrement) {
  return {
    id: enregistrement.id,
    role: enregistrement.role,
    prenom: enregistrement.prenom,
    nom: enregistrement.nom,
    email: enregistrement.email,
    motDePasseClair: enregistrement.mot_de_passe_clair,
    dateCreation: enregistrement.date_creation,
  };
}

function versLogement(enregistrement) {
  return {
    id: enregistrement.id,
    titre: enregistrement.titre,
    typeLogement: enregistrement.type_logement,
    ville: enregistrement.ville,
    prixParNuit: enregistrement.prix_par_nuit,
    idHote: enregistrement.id_hote,
    dateCreation: enregistrement.date_creation,
  };
}

/**
 * Transforme le contenu texte du CSV en deux listes : utilisateurs et logements.
 * La première ligne est l'en-tête ; la colonne type_enregistrement indique la nature
 * de chaque ligne. Les lignes vides sont ignorées.
 */
export function parserCsv(texte) {
  const lignes = texte
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .filter((ligne) => ligne.trim() !== '');

  if (lignes.length === 0) {
    return { utilisateurs: [], logements: [] };
  }

  const entetes = decouperLigne(lignes[0]);
  const utilisateurs = [];
  const logements = [];

  for (const ligne of lignes.slice(1)) {
    const valeurs = decouperLigne(ligne);
    const enregistrement = {};
    entetes.forEach((cle, index) => {
      enregistrement[cle] = valeurs[index] ?? '';
    });

    if (enregistrement.type_enregistrement === 'utilisateur') {
      utilisateurs.push(versUtilisateur(enregistrement));
    } else if (enregistrement.type_enregistrement === 'logement') {
      logements.push(versLogement(enregistrement));
    }
  }

  return { utilisateurs, logements };
}

/**
 * Lit le fichier CSV sur le disque et renvoie les données parsées.
 */
export async function chargerDonnees(cheminFichier) {
  const texte = await readFile(cheminFichier, 'utf8');
  return parserCsv(texte);
}
