const express = require("express");
const router = express.Router();

const secteurActiviteController = require("../controllers/secteurActiviteController");

// جلب كل القطاعات
router.get("/", secteurActiviteController.getAllSecteurs);

// جلب قطاع حسب id
router.get("/:id", secteurActiviteController.getSecteurById);

// إنشاء قطاع جديد
router.post("/", secteurActiviteController.createSecteur);

// تحديث قطاع موجود
router.put("/:id", secteurActiviteController.updateSecteur);

// حذف قطاع
router.delete("/:id", secteurActiviteController.deleteSecteur);

module.exports = router;
