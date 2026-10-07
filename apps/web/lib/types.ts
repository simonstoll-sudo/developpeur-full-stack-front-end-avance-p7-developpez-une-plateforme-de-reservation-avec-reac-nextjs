export type Role = 'utilisateur' | 'hote' | 'administrateur';

export interface Hote {
  prenom: string;
  nom: string;
}

export interface Logement {
  id: string;
  titre: string;
  typeLogement: 'appartement' | 'maison';
  ville: string;
  prixParNuit: string;
  idHote: string;
  dateCreation: string;
  hote: Hote | null;
}

export interface ReponseConnexion {
  id: string;
  role: Role;
  prenom: string;
  nom: string;
  email: string;
}

export interface SessionUtilisateur {
  id: string;
  role: Role;
  prenom: string;
}
