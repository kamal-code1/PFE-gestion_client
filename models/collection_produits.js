const db = require("../config/db");

async function getAllCollectionProduits() {
  const [rows] = await db.query("SELECT * FROM collection_produits");
  return rows;
}

async function getCollectionProduitById(id) {
  const [rows] = await db.query(
    "SELECT * FROM collection_produits WHERE id = ?",
    [id],
  );
  return rows[0];
}

async function createCollectionProduit(cp) {
  const { collection_id, produit_id } = cp;
  const [result] = await db.query(
    "INSERT INTO collection_produits (collection_id, produit_id) VALUES (?, ?)",
    [collection_id, produit_id],
  );
  return result.insertId;
}

async function updateCollectionProduit(id, cp) {
  const { collection_id, produit_id } = cp;
  await db.query(
    "UPDATE collection_produits SET collection_id=?, produit_id=? WHERE id=?",
    [collection_id, produit_id, id],
  );
}

async function deleteCollectionProduit(id) {
  await db.query("DELETE FROM collection_produits WHERE id = ?", [id]);
}

module.exports = {
  getAllCollectionProduits,
  getCollectionProduitById,
  createCollectionProduit,
  updateCollectionProduit,
  deleteCollectionProduit,
};
