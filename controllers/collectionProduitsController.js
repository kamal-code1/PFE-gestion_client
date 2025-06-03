const CollectionProduits = require('../models/collection_produits');


async function getAllCollectionProduits(req, res) {
  try {
    const cps = await collectionProduitsModel.getAllCollectionProduits();
    res.json(cps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCollectionProduitById(req, res) {
  try {
    const id = req.params.id;
    const cp = await collectionProduitsModel.getCollectionProduitById(id);
    if (!cp) return res.status(404).json({ error: "Collection_Produit non trouvé" });
    res.json(cp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createCollectionProduit(req, res) {
  try {
    const newId = await collectionProduitsModel.createCollectionProduit(req.body);
    res.status(201).json({ message: "Collection_Produit créé", id: newId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCollectionProduit(req, res) {
  try {
    const id = req.params.id;
    await collectionProduitsModel.updateCollectionProduit(id, req.body);
    res.json({ message: "Collection_Produit mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCollectionProduit(req, res) {
  try {
    const id = req.params.id;
    await collectionProduitsModel.deleteCollectionProduit(id);
    res.json({ message: "Collection_Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllCollectionProduits,
  getCollectionProduitById,
  createCollectionProduit,
  updateCollectionProduit,
  deleteCollectionProduit,
};
