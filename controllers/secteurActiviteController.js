const secteurActiviteModel = require('../models/secteurActiviteModel');

async function getAllSecteurs(req, res) {
  try {
    const secteurs = await secteurActiviteModel.getAllSecteurs();
    res.json(secteurs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getSecteurById(req, res) {
  try {
    const id = req.params.id;
    const secteur = await secteurActiviteModel.getSecteurById(id);
    if (!secteur) return res.status(404).json({ error: "Secteur non trouvé" });
    res.json(secteur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createSecteur(req, res) {
  try {
    const newId = await secteurActiviteModel.createSecteur(req.body);
    res.status(201).json({ message: "Secteur créé", id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateSecteur(req, res) {
  try {
    const id = req.params.id;
    await secteurActiviteModel.updateSecteur(id, req.body);
    res.json({ message: "Secteur mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteSecteur(req, res) {
  try {
    const id = req.params.id;
    await secteurActiviteModel.deleteSecteur(id);
    res.json({ message: "Secteur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllSecteurs,
  getSecteurById,
  createSecteur,
  updateSecteur,
  deleteSecteur,
};
