const express = require('express');
const { ObjectId } = require('mongodb');

/**
 * Routes CRUD génériques pour une collection MongoDB.
 * GET /, GET /:id, POST /, PUT /:id, DELETE /:id
 * @param {import('mongodb').Db} db
 * @param {string} collectionName
 * @param {{ required?: string[] }} [options] champs obligatoires à la création
 */
module.exports = function crudRoutes(db, collectionName, options = {}) {
  const router = express.Router();
  const collection = db.collection(collectionName);
  const required = options.required || [];

  // Identifiant MongoDB invalide : 400 plutôt qu'une erreur serveur
  function parseId(req, res) {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: 'Identifiant invalide' });
      return null;
    }
    return new ObjectId(req.params.id);
  }

  // _id ne doit jamais être modifié par le client
  function body(req) {
    const { _id, ...data } = req.body || {};
    return data;
  }

  router.get('/', async (req, res, next) => {
    try {
      res.json(await collection.find().toArray());
    } catch (err) {
      next(err);
    }
  });

  router.get('/:id', async (req, res, next) => {
    const id = parseId(req, res);
    if (!id) return;
    try {
      const doc = await collection.findOne({ _id: id });
      if (!doc) return res.status(404).json({ error: 'Élément non trouvé' });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const data = body(req);
    const missing = required.filter((field) => data[field] === undefined || data[field] === '');
    if (missing.length) {
      return res.status(400).json({ error: `Champs obligatoires manquants : ${missing.join(', ')}` });
    }
    try {
      const result = await collection.insertOne(data);
      res.status(201).json({ _id: result.insertedId, ...data });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    const id = parseId(req, res);
    if (!id) return;
    try {
      const result = await collection.findOneAndUpdate(
        { _id: id },
        { $set: body(req) },
        { returnDocument: 'after' }
      );
      if (!result) return res.status(404).json({ error: 'Élément non trouvé' });
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    const id = parseId(req, res);
    if (!id) return;
    try {
      const result = await collection.deleteOne({ _id: id });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Élément non trouvé' });
      res.status(204).end();
    } catch (err) {
      next(err);
    }
  });

  return router;
};
