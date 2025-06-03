const db = require('../config/db'); 
async function getAllSecteurs() {
  const [rows] = await db.query('SELECT * FROM secteur_activite');
  return rows;
}

async function getSecteurById(id) {
  const [rows] = await db.query('SELECT * FROM secteur_activite WHERE id = ?', [id]);
  return rows[0];
}

async function createSecteur(secteur) {
  const { nom } = secteur;
  const [result] = await db.query('INSERT INTO secteur_activite (nom) VALUES (?)', [nom]);
  return result.insertId;
}

async function updateSecteur(id, secteur) {
  const { nom } = secteur;
  await db.query('UPDATE secteur_activite SET nom = ? WHERE id = ?', [nom, id]);
}

async function deleteSecteur(id) {
  await db.query('DELETE FROM secteur_activite WHERE id = ?', [id]);
}

module.exports = {
  getAllSecteurs,
  getSecteurById,
  createSecteur,
  updateSecteur,
  deleteSecteur,
};
