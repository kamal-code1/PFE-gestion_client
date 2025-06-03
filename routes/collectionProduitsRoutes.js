const express = require('express');
const router = express.Router();
const controller = require('../controllers/collectionProduitsController');

router.get('/', controller.getAllCollectionProduits);
router.get('/:id', controller.getCollectionProduitById);
router.post('/', controller.createCollectionProduit);
router.put('/:id', controller.updateCollectionProduit);
router.delete('/:id', controller.deleteCollectionProduit);

module.exports = router;
