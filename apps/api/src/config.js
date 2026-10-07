import path from 'node:path';

// Dossier apps/api : les chemins relatifs des variables d'environnement sont résolus depuis ici,
// quel que soit le répertoire depuis lequel l'API est lancée.
const racineApi = path.resolve(import.meta.dirname, '..');

const FICHIER_DONNEES_PAR_DEFAUT = '../../starter-kit/donnees-logements-utilisateurs-kasa.csv';

export const config = {
  port: Number(process.env.PORT ?? 4000),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
  dataFile: path.resolve(racineApi, process.env.DATA_FILE ?? FICHIER_DONNEES_PAR_DEFAUT),
};
