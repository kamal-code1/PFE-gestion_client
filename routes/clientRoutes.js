const express = require('express');
const { ObjectId } = require('mongodb');

module.exports = function (db) {
  const router = express.Router();
  const clients = db.collection('clients');

  router.get('/', async (req, res) => {
    try {
      const data = await clients.find().toArray();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const result = await clients.insertOne(req.body);
      res.status(201).json({ insertedId: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await clients.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );
      if (result.matchedCount === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json({ matchedCount: result.matchedCount, modifiedCount: result.modifiedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const result = await clients.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Client not found' });
      }
      res.json({ deletedCount: result.deletedCount });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  return router;
};
