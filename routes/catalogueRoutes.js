const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const catalogues = await req.db.collection('catalogue').find().toArray();
  res.json(catalogues);
});

router.post('/', async (req, res) => {
  const result = await req.db.collection('catalogue').insertOne(req.body);
  res.status(201).json({ insertedId: result.insertedId });
});

module.exports = router;

