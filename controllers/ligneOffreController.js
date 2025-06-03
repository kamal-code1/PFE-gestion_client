const db = require('../config/db');

async function getAllLigneOffres(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM ligneoffre');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function getLigneOffreById(req, res) {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM ligneoffre WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Ligne offre non trouvée' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function createLigneOffre(req, res) {
  const { offre_id, prix, produit_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO ligneoffre (offre_id, prix, produit_id) VALUES (?, ?, ?)',
      [offre_id, prix, produit_id]
    );
    res.status(201).json({ id: result.insertId, offre_id, prix, produit_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function updateLigneOffre(req, res) {
  const { id } = req.params;
  const { offre_id, prix, produit_id } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE ligneoffre SET offre_id = ?, prix = ?, produit_id = ? WHERE id = ?',
      [offre_id, prix, produit_id, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ligne offre non trouvée' });
    }
    res.json({ message: 'Ligne offre mise à jour' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

async function deleteLigneOffre(req, res) {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM ligneoffre WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ligne offre non trouvée' });
    }
    res.json({ message: 'Ligne offre supprimée' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

module.exports = {
  getAllLigneOffres,
  getLigneOffreById,
  createLigneOffre,
  updateLigneOffre,
  deleteLigneOffre
};
