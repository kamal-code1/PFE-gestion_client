const catalogueModel = require('../models/catalogue');
async function getAllCatalogues(req, res) {
  try {
    const catalogues = await catalogueModel.getAllCatalogues();
    res.json(catalogues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCatalogueById(req, res) {
  try {
    const id = req.params.id;
    const catalogue = await catalogueModel.getCatalogueById(id);
    if (!catalogue) return res.status(404).json({ error: "Catalogue non trouvé" });
    res.json(catalogue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCatalogue(req, res) {
  try {
    const newId = await catalogueModel.createCatalogue(req.body);
    res.status(201).json({ message: "Catalogue créé", id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCatalogue(req, res) {
  try {
    const id = req.params.id;
    await catalogueModel.updateCatalogue(id, req.body);
    res.json({ message: "Catalogue mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCatalogue(req, res) {
  try {
    const id = req.params.id;
    await catalogueModel.deleteCatalogue(id);
    res.json({ message: "Catalogue supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCatalogues,
  getCatalogueById,
  createCatalogue,
  updateCatalogue,
  deleteCatalogue,
};
