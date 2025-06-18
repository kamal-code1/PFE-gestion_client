const express = require("express");
const router = express.Router();
const ligneOffreController = require("../controllers/ligneOffreController");

router.get("/", ligneOffreController.getAllLigneOffres);
router.get("/:id", ligneOffreController.getLigneOffreById);
router.post("/", ligneOffreController.createLigneOffre);
router.put("/:id", ligneOffreController.updateLigneOffre);
router.delete("/:id", ligneOffreController.deleteLigneOffre);

module.exports = router;
