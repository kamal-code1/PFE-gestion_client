const express = require('express');
const router = express.Router();
const frssController = require('../controllers/frssController');

router.get('/', frssController.getAllFrss);
router.get('/:id', frssController.getFrssById);
router.post('/', frssController.createFrss);
router.put('/:id', frssController.updateFrss);
router.delete('/:id', frssController.deleteFrss);

module.exports = router;
