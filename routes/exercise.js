const express = require("express");
const router = express.Router();
const ExercisesController = require("../controllers/exercise");

// Definir rutas
router.get("/test", ExercisesController.test);
router.get("", ExercisesController.exercises);
router.post("/create", ExercisesController.create);
router.put("/:id/update", ExercisesController.update);
router.delete("/:id/delete", ExercisesController.deleteExercise);

module.exports = router;