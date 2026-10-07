import { Router } from 'express';
import { config } from '../config.js';
import { chargerDonnees } from '../donnees/chargeurCsv.js';

const routeurLogements = Router();

/**
 * Ajoute au logement le prénom et le nom de son hôte, retrouvés dans la liste des utilisateurs.
 * Seules ces deux informations sur l'hôte sont exposées par l'API.
 */
function enrichirLogement(logement, utilisateurs) {
  const hote = utilisateurs.find((utilisateur) => utilisateur.id === logement.idHote);
  return {
    ...logement,
    hote: hote ? { prenom: hote.prenom, nom: hote.nom } : null,
  };
}

routeurLogements.get('/', async (req, res) => {
  const { utilisateurs, logements } = await chargerDonnees(config.dataFile);
  res.json(logements.map((logement) => enrichirLogement(logement, utilisateurs)));
});

routeurLogements.get('/:id', async (req, res) => {
  const { utilisateurs, logements } = await chargerDonnees(config.dataFile);
  const enrichis = logements.map((logement) => enrichirLogement(logement, utilisateurs));
  res.json(enrichis.find((logement) => logement.id === req.params.id));
});

export default routeurLogements;
