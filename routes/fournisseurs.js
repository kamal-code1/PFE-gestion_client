const express = require('express');
const router = express.Router();

const fournisseurController = require('../controllers/fournisseursController');

router.get('/', fournisseurController.listerFournisseurs);
router.get('/:id', fournisseurController.getFournisseur);
router.post('/', fournisseurController.ajouterFournisseur);
router.put('/:id', fournisseurController.modifierFournisseur);
router.delete('/:id', fournisseurController.supprimerFournisseur);

module.exports = router;
