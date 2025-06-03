const db = require('../config/db');

async function getAllLigneOffres() {
  const [rows] = await db.query('SELECT * FROM ligneoffre');
  return rows;
}

async function getLigneOffreById(id) {
  const [rows] = await db.query('SELECT * FROM ligneoffre WHERE id = ?', [id]);
  return rows[0];
}

async function createLigneOffre(lo) {
  const { offre_id, prix, produit_id } = lo;
  const [result] = await db.query(
    'INSERT INTO ligneoffre (offre_id, prix, produit_id) VALUES (?, ?, ?)',
    [offre_id, prix, produit_id]
  );
  return result.insertId;
}

async function updateLigneOffre(id, lo) {
  const { offre_id, prix, produit_id } = lo;
  await db.query(
    'UPDATE ligneoffre SET offre_id=?, prix=?, produit_id=? WHERE id=?',
    [offre_id, prix, produit_id, id]
  );
}

async function deleteLigneOffre(id) {
  await db.query('DELETE FROM ligneoffre WHERE id = ?', [id]);
}

module.exports = {
  getAllLigneOffres,
  getLigneOffreById,
  createLigneOffre,
  updateLigneOffre,
  deleteLigneOffre,
};
