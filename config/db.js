const { MongoClient } = require('mongodb');

// Connexion configurée par variables d'environnement (voir .env.example)
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'gestion_client';

const client = new MongoClient(uri);

let dbInstance = null;

async function connectDB() {
  if (dbInstance) return dbInstance;
  try {
    await client.connect();
    console.log('✅ Connexion à MongoDB réussie !');
    dbInstance = client.db(dbName);
    return dbInstance;
  } catch (err) {
    console.error('❌ Erreur de connexion à MongoDB :', err.message);
    throw err;
  }
}

async function closeDB() {
  await client.close();
  dbInstance = null;
  console.log('🔌 Connexion MongoDB fermée.');
}

module.exports = { connectDB, closeDB };
