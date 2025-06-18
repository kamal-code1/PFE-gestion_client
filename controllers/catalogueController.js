const { ObjectId } = require("mongodb");

exports.getAllCatalogues = async (req, res) => {
  try {
    const catalogues = await req.db.collection("catalogue").find().toArray();
    res.json(catalogues);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération des catalogues" });
  }
};

exports.getCatalogueById = async (req, res) => {
  try {
    const id = req.params.id;
    const catalogue = await req.db.collection("catalogue").findOne({ _id: new ObjectId(id) });
    if (!catalogue) return res.status(404).json({ error: "Catalogue non trouvé" });
    res.json(catalogue);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la récupération du catalogue" });
  }
};

exports.createCatalogue = async (req, res) => {
  try {
    const newCatalogue = req.body;
    const result = await req.db.collection("catalogue").insertOne(newCatalogue);
    res.status(201).json({ insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création du catalogue" });
  }
};

exports.updateCatalogue = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await req.db.collection("catalogue").updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedData }
    );
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "Catalogue non trouvé" });
    res.json({ modifiedCount: result.modifiedCount });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du catalogue" });
  }
};

exports.deleteCatalogue = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await req.db.collection("catalogue").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "Catalogue non trouvé" });
    res.json({ deletedCount: result.deletedCount });
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la suppression du catalogue" });
  }
};
