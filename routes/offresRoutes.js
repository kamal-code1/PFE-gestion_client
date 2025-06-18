const express = require("express");
const router = express.Router();
const offresController = require("../controllers/offresController");

router.get("/", offresController.getAllOffres);
router.get("/:id", offresController.getOffreById);
router.post("/", offresController.createOffre);
router.put("/:id", offresController.updateOffre);
router.delete("/:id", offresController.deleteOffre);

module.exports = router;
