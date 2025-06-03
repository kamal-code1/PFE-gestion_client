const frssModel = require('../models/frssModel');

async function getAllFrss(req, res) {
  try {
    const frss = await frssModel.getAllFrss();
    res.json(frss);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFrssById(req, res) {
  try {
    const id = req.params.id;
    const fournisseur = await frssModel.getFrssById(id);
    if (!fournisseur) return res.status(404).json({ error: "Fournisseur non trouvé" });
    res.json(fournisseur);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createFrss(req, res) {
  try {
    const newId = await frssModel.createFrss(req.body);
    res.status(201).json({ message: "Fournisseur créé", id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateFrss(req, res) {
  try {
    const id = req.params.id;
    await frssModel.updateFrss(id, req.body);
    res.json({ message: "Fournisseur mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteFrss(req, res) {
  try {
    const id = req.params.id;
    await frssModel.deleteFrss(id);
    res.json({ message: "Fournisseur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllFrss,
  getFrssById,
  createFrss,
  updateFrss,
  deleteFrss,
};
