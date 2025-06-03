const db = require('../config/db');

async function getAllProduits() {
  const [rows] = await db.query('SELECT * FROM produits');
  return rows;
}

async function getProduitById(id) {
  const [rows] = await db.query('SELECT * FROM produits WHERE id = ?', [id]);
  return rows[0];
}

async function createProduit(produit) {
  const { nom, description, prix, image_url, catalogue_id } = produit;
  const [result] = await db.query(
    'INSERT INTO produits (nom, description, prix, image_url, catalogue_id) VALUES (?, ?, ?, ?, ?)',
    [nom, description, prix, image_url, catalogue_id]
  );
  return result.insertId;
}

async function updateProduit(id, produit) {
  const { nom, description, prix, image_url, catalogue_id } = produit;
  await db.query(
    'UPDATE produits SET nom=?, description=?, prix=?, image_url=?, catalogue_id=? WHERE id=?',
    [nom, description, prix, image_url, catalogue_id, id]
  );
}

async function deleteProduit(id) {
  await db.query('DELETE FROM produits WHERE id = ?', [id]);
}

module.exports = {
  getAllProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
};
