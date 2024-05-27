const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/food");

// Definir rutas
router.get("/test", FoodController.test);
router.get("", FoodController.food);
router.post("/create", FoodController.create);
router.put("/:id/update", FoodController.update);
router.delete("/:id/delete", FoodController.deleteFood);
router.get("/supermarkets", FoodController.listOfSupermarkets);

// Exportar router
module.exports = router;
