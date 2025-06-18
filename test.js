console.log("Starting DB test...");

const { MongoClient } = require('mongodb');
require('dotenv').config();

async function testConnection() {
  console.log("Trying to connect to database...");
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db('gestion_clients');
    const count = await db.collection('clients').countDocuments();
    console.log('Database connected, nombre de documents dans clients:', count);
  } catch (error) {
    console.error('DB connection error:', error.message);
  } finally {
    await client.close();
    console.log("Connection closed.");
  }
}

testConnection();
