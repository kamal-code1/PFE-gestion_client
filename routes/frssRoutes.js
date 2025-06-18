const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = function(db) {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const frss = await db.collection('frss').find().toArray();
      res.json(frss);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const newFrs = req.body;
      const result = await db.collection('frss').insertOne(newFrs);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = req.body;
      const result = await db.collection('frss').updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedData }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Fournisseur non trouvé' });
      }
      res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await db.collection('frss').deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Fournisseur non trouvé' });
      }
      res.json({ deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
