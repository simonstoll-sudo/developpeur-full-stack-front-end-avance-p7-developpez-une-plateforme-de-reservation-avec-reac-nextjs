import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import routeurLogements from './routes/logements.js';
import routeurAuth from './routes/auth.js';

const app = express();

app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());

app.get('/api/sante', (req, res) => {
  res.json({ statut: 'ok' });
});

app.use('/api/logements', routeurLogements);
app.use('/api/auth', routeurAuth);

app.listen(config.port, () => {
  console.log(`API Kasa à l'écoute sur http://localhost:${config.port}`);
});
