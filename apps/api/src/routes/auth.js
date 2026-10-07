import { Router } from 'express';
import { config } from '../config.js';
import { chargerDonnees } from '../donnees/chargeurCsv.js';

const routeurAuth = Router();

routeurAuth.post('/login', async (req, res) => {
  const { email, motDePasse } = req.body;
  const { utilisateurs } = await chargerDonnees(config.dataFile);

  const utilisateur = utilisateurs.find(
    (candidat) => candidat.email === email && candidat.motDePasseClair === motDePasse,
  );

  if (!utilisateur) {
    return res.status(401).json({ message: 'Identifiants invalides' });
  }

  res.json({
    id: utilisateur.id,
    role: utilisateur.role,
    prenom: utilisateur.prenom,
    nom: utilisateur.nom,
    email: utilisateur.email,
  });
});

export default routeurAuth;
