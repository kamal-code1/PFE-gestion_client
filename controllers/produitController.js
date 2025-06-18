const produitsModel = require("../models/produits");


async function getAllProduits(req, res) {
  try {
    const produits = await produitsModel.getAllProduits();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function getProduitById(req, res) {
  try {
    const id = req.params.id;
    const produit = await produitsModel.getProduitById(id);
    if (!produit) return res.status(404).json({ error: "Produit non trouvé" });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function createProduit(req, res) {
  try {
    const newProduitId = await produitsModel.createProduit(req.body);
    res.status(201).json({ message: "Produit créé", id: newProduitId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function updateProduit(req, res) {
  try {
    const id = req.params.id;
    await produitsModel.updateProduit(id, req.body);
    res.json({ message: "Produit mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


async function deleteProduit(req, res) {
  try {
    const id = req.params.id;
    await produitsModel.deleteProduit(id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllProduits,
  getProduitById,
  createProduit,
  updateProduit,
  deleteProduit,
};
