require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const crudRoutes = require('./routes/crudRoutes');

// Ressources exposées sous /api/<nom> : collection MongoDB et champs obligatoires
const RESOURCES = [
  { path: 'clients', collection: 'clients', required: ['nom', 'email'] },
  { path: 'fournisseurs', collection: 'fournisseurs', required: ['nom'] },
  { path: 'produits', collection: 'produits', required: ['nom'] },
  { path: 'catalogues', collection: 'catalogues', required: ['nom'] },
  { path: 'collections', collection: 'collections', required: ['nom'] },
  { path: 'collection-produits', collection: 'collection_produits' },
  { path: 'secteurs', collection: 'secteurs_activite', required: ['nom'] },
  { path: 'offres', collection: 'offres' },
  { path: 'ligne-offres', collection: 'ligne_offres' },
];

function createApp(db) {
  const app = express();

  app.use(express.json());

  // Origines autorisées : CORS_ORIGIN (séparées par des virgules), sinon toutes (développement local)
  const allowedOrigins = (process.env.CORS_ORIGIN || '*').split(',').map((o) => o.trim());
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes('*')) res.header('Access-Control-Allow-Origin', '*');
    else if (origin && allowedOrigins.includes(origin)) res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
  });

  app.get('/', (req, res) => res.send('API Gestion Clients OK'));
  app.get('/health', (req, res) => res.json({ status: 'ok' }));

  for (const r of RESOURCES) {
    app.use(`/api/${r.path}`, crudRoutes(db, r.collection, { required: r.required }));
  }

  app.use((req, res) => res.status(404).json({ error: 'Route introuvable' }));

  // Erreurs non prévues : message générique, détail dans les journaux du serveur
  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'JSON invalide' });
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  });

  return app;
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  connectDB()
    .then((db) => {
      createApp(db).listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
    })
    .catch(() => process.exit(1));
}

module.exports = { createApp, RESOURCES };
