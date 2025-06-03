const db = require('../config/db');

async function getAllCatalogues() {
  const [rows] = await db.query('SELECT * FROM catalogue');
  return rows;
}

async function getCatalogueById(id) {
  const [rows] = await db.query('SELECT * FROM catalogue WHERE id = ?', [id]);
  return rows[0];
}

async function createCatalogue(catalogue) {
  const { titre, description, date_creation, frssID } = catalogue;
  const [result] = await db.query(
    'INSERT INTO catalogue (titre, description, date_creation, frssID) VALUES (?, ?, ?, ?)',
    [titre, description, date_creation, frssID]
  );
  return result.insertId;
}

async function updateCatalogue(id, catalogue) {
  const { titre, description, date_creation, frssID } = catalogue;
  await db.query(
    'UPDATE catalogue SET titre=?, description=?, date_creation=?, frssID=? WHERE id=?',
    [titre, description, date_creation, frssID, id]
  );
}

async function deleteCatalogue(id) {
  await db.query('DELETE FROM catalogue WHERE id = ?', [id]);
}

module.exports = {
  getAllCatalogues,
  getCatalogueById,
  createCatalogue,
  updateCatalogue,
  deleteCatalogue,
};
