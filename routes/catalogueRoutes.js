const express = require('express');
const router = express.Router();
const catalogueController = require('../controllers/catalogueController');

router.get('/', catalogueController.getAllCatalogues);
router.get('/:id', catalogueController.getCatalogueById);
router.post('/', catalogueController.createCatalogue);
router.put('/:id', catalogueController.updateCatalogue);
router.delete('/:id', catalogueController.deleteCatalogue);

module.exports = router;
