const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produitController');

// جميع المنتجات
router.get('/', produitController.getAllProduits);

// منتج معين بالمعرف
router.get('/:id', produitController.getProduitById);

// إنشاء منتج جديد
router.post('/', produitController.createProduit);

// تعديل منتج موجود
router.put('/:id', produitController.updateProduit);

// حذف منتج
router.delete('/:id', produitController.deleteProduit);

module.exports = router;
