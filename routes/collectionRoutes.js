const express = require("express");
const { ObjectId } = require("mongodb");

module.exports = function (db) {
  const router = express.Router();
  const collection = db.collection("collection");

  // GET toutes les collections
  router.get("/", async (req, res) => {
    try {
      const data = await collection.find().toArray();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET une collection par ID
  router.get("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const item = await collection.findOne({ _id: new ObjectId(id) });
      if (!item) return res.status(404).json({ error: "Collection non trouvée" });
      res.json(item);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST créer une collection
  router.post("/", async (req, res) => {
    try {
      const result = await collection.insertOne(req.body);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // PUT mettre à jour une collection
  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      if (result.matchedCount === 0)
        return res.status(404).json({ error: "Collection non trouvée" });
      res.json({ modifiedCount: result.modifiedCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // DELETE supprimer une collection
  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0)
        return res.status(404).json({ error: "Collection non trouvée" });
      res.json({ deletedCount: result.deletedCount });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};
