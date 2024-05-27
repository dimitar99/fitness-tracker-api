const express = require("express");
const router = express.Router();
const RoutinesController = require("../controllers/routines");

// Definir rutas
router.get("/test", RoutinesController.test);
router.get("", RoutinesController.routines);
router.get("/by-date", RoutinesController.getByDate);
router.post("/create", RoutinesController.create);
router.put("/:id/update", RoutinesController.update);
router.delete("/:id/delete", RoutinesController.deleteRoutine);
module.exports = router;