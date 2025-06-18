const db = require("../config/db");

async function getAllCollections() {
  const [rows] = await db.query("SELECT * FROM collection");
  return rows;
}

async function getCollectionById(id) {
  const [rows] = await db.query("SELECT * FROM collection WHERE id = ?", [id]);
  return rows[0];
}

async function createCollection(collection) {
  const { nom, description } = collection;
  const [result] = await db.query(
    "INSERT INTO collection (nom, description) VALUES (?, ?)",
    [nom, description],
  );
  return result.insertId;
}

async function updateCollection(id, collection) {
  const { nom, description } = collection;
  await db.query("UPDATE collection SET nom=?, description=? WHERE id=?", [
    nom,
    description,
    id,
  ]);
}

async function deleteCollection(id) {
  await db.query("DELETE FROM collection WHERE id = ?", [id]);
}

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
