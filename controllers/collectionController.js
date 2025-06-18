const db = require('../config/db');


async function getAllCollections(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM collection');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function getCollectionById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM collection WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Collection non trouvée' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function createCollection(req, res) {
  const { titre, description, client_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO collection (titre, description, client_id) VALUES (?, ?, ?)',
      [titre, description, client_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function updateCollection(req, res) {
  const { id } = req.params;
  const { titre, description, client_id } = req.body;
  try {
    await db.query(
      'UPDATE collection SET titre = ?, description = ?, client_id = ? WHERE id = ?',
      [titre, description, client_id, id]
    );
    res.json({ message: 'Collection mise à jour' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}


async function deleteCollection(req, res) {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM collection WHERE id = ?', [id]);
    res.json({ message: 'Collection supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
