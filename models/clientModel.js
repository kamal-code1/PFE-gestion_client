const db = require('../config/db');


const getAllClients = async () => {
  const [rows] = await db.query('SELECT * FROM clients');
  return rows;
};

const getClientById = async (id) => {
  const [rows] = await db.query('SELECT * FROM clients WHERE id = ?', [id]);
  return rows[0];
};


const createClient = async (client) => {
  const { ice, nom, email, mot_de_passe, telephone, secteur_id, adresse } = client;
  const [result] = await db.query(
    'INSERT INTO clients (ice, nom, email, mot_de_passe, telephone, secteur_id, adresse) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [ice, nom, email, mot_de_passe, telephone, secteur_id, adresse]
  );
  return result.insertId;
};


const updateClient = async (id, client) => {
  const { ice, nom, email, mot_de_passe, telephone, secteur_id, adresse } = client;
  await db.query(
    'UPDATE clients SET ice = ?, nom = ?, email = ?, mot_de_passe = ?, telephone = ?, secteur_id = ?, adresse = ? WHERE id = ?',
    [ice, nom, email, mot_de_passe, telephone, secteur_id, adresse, id]
  );
};


const deleteClient = async (id) => {
  await db.query('DELETE FROM clients WHERE id = ?', [id]);
};

module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
