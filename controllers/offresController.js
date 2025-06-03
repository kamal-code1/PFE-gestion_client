const offresModel = require('../models/offresModel');

async function getAllOffres(req, res) {
  try {
    const offres = await offresModel.getAllOffres();
    res.json(offres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getOffreById(req, res) {
  try {
    const id = req.params.id;
    const offre = await offresModel.getOffreById(id);
    if (!offre) return res.status(404).json({ error: "Offre non trouvée" });
    res.json(offre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createOffre(req, res) {
  try {
    const newOffreId = await offresModel.createOffre(req.body);
    res.status(201).json({ message: "Offre créée", id: newOffreId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateOffre(req, res) {
  try {
    const id = req.params.id;
    await offresModel.updateOffre(id, req.body);
    res.json({ message: "Offre mise à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteOffre(req, res) {
  try {
    const id = req.params.id;
    await offresModel.deleteOffre(id);
    res.json({ message: "Offre supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllOffres,
  getOffreById,
  createOffre,
  updateOffre,
  deleteOffre,
};
