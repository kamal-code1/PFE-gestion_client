const db = require('../config/db');

async function getAllClients() {
  const [rows] = await db.query('SELECT * FROM clients');
  return rows;
}

async function getClientById(id) {
  const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
  return rows[0];
}

async function createClient(client) {
  const { ice, nom, email, mot_de_passe, telephone, secteur_id, adresse } = client;
  const [result] = await db.query(
    'INSERT INTO clients (ice, nom, email, mot_de_passe, telephone, secteur_id, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ice, nom, email, mot_de_passe, telephone, secteur_id, adresse]
  );
  return result.insertId;
}

async function updateClient(id, client) {
  const { ice, nom, email, mot_de_passe, telephone, secteur_id, adresse } = client;
  await db.query(
    'UPDATE clients SET ice=?, nom=?, email=?, mot_de_passe=?, telephone=?, secteur_id=?, adresse=? WHERE id=?',
    [ice, nom, email, mot_de_passe, telephone, secteur_id, adresse, id]
  );
}

async function deleteClient(id) {
  await db.query('DELETE FROM clients WHERE id = ?', [id]);
}

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
