const { ObjectId } = require('mongodb');
const connectDB = require('../config/db');

async function getAllClients() {
  const db = await connectDB();
  return db.collection('clients').find().toArray();
}

async function getClientById(id) {
  const db = await connectDB();
  return db.collection('clients').findOne({ _id: new ObjectId(id) });
}

async function createClient(client) {
  const db = await connectDB();
  const result = await db.collection('clients').insertOne(client);
  return result.insertedId;
}

async function updateClient(id, client) {
  const db = await connectDB();
  await db.collection('clients').updateOne(
    { _id: new ObjectId(id) },
    { $set: client }
  );
}

async function deleteClient(id) {
  const db = await connectDB();
  await db.collection('clients').deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
