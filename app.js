const express = require('express');
const mongoose = require('mongoose');
const fournisseursRoutes = require('./routes/fournisseurs');  // vérifie le chemin

const app = express();

mongoose.connect('mongodb://localhost:27017/gestion_client')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// C’est cette ligne qui connecte les routes
// app.get('/api/fournisseurs', (req, res) => {
//   console.log('Route /api/fournisseurs appelée');
//   res.json([{ nom: "Fournisseur Test", adresse: "Adresse test" }]);
// });

app.use('/api/fournisseurs', (req, res, next) => {
  console.log(`Request received: ${req.method} ${req.originalUrl}`);
  next();
}, fournisseursRoutes);


app.get('/', (req, res) => {
  res.send('API Gestion Fournisseurs OK');
});

app.get('/test', (req, res) => {
  res.send('Test route is working');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
8
