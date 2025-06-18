const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'; // URI اتصال MongoDB

const client = new MongoClient(uri);

let dbInstance = null;

async function connectDB() {
  if (dbInstance) {
    console.warn("⚠️ connectDB() called but connection already exists.");
    return dbInstance;
  }
  try {
    await client.connect();
    console.log("✅ Connexion à MongoDB réussie !");
    dbInstance = client.db('gestion_client');ت
    return dbInstance;
  } catch (err) {
    console.error("❌ Erreur de connexion à MongoDB :", err);
    throw err;
  }
}

async function closeDB() {
  await client.close();
  dbInstance = null;
  console.log("🔌 Connexion MongoDB fermée.");
}

module.exports = { connectDB, closeDB };
