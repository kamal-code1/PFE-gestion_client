const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = function (db) {
  const router = express.Router();
  const collectionProduits = db.collection("collectionProduits");

  router.get("/", async (req, res) => {
    try {
      const data = await collectionProduits.find().toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const item = await collectionProduits.findOne({ _id: new ObjectId(id) });
      if (!item) return res.status(404).json({ error: "Élément non trouvé" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const result = await collectionProduits.insertOne(req.body);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collectionProduits.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      if (result.matchedCount === 0)
        return res.status(404).json({ error: "Élément non trouvé" });
      res.json({ modifiedCount: result.modifiedCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collectionProduits.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Élément non trouvé" });
      res.json({ deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
