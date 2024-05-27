const Food = require("../models/food");
const supermarkets = require("../utils/supermarkets_enum");
const { ObjectId } = require("mongodb");

const test = (_, res) => {
  return res.status(200).json({
    message: "Test from food controller",
  });
};

const food = (_, res) => {
  // Obtener todos los alimentos
  Food.find({})
    .then((food) => {
      if (food && food.length >= 1) {
        return res.status(200).json({
          status: "success",
          food,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado alimentos",
        });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Ha ocurrido un error: " + error,
      });
    });
};

const create = (req, res) => {
  // Recoger datos de la peticion
  let params = req.body;

  console.log(params);

  // Comprobar parametros requeridos
  if (
    !params.title ||
    !params.carbs ||
    !params.fats ||
    !params.proteins ||
    !params.calories ||
    !params.supermarket
  ) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // Comprobamos si el supermercado se encuentra en la lista de supermercados
  if (!supermarkets.includes(params.supermarket)) {
    return res.status(400).json({
      status: "error",
      message: "Supermercado no permitido",
    });
  }

  Food.find({
    $and: [{ title: params.title }, { supermarket: params.supermarket }],
  })
    .then(async (food) => {
      if (food && food.length >= 1) {
        return res.status(409).json({
          status: "error",
          message: "Ya se ha añadido ese alimento de ese supermercado",
        });
      } else {
        const food_to_save = new Food(params);

        food_to_save
          .save()
          .then((food) => {
            return res.status(200).json({
              status: "success",
              message: "create succesfully",
              food,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              status: "error",
              message: "Ha ocurrido un error: " + error,
            });
          });
      }
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Ha ocurrido un error: " + error,
      });
    });
};

const update = (req, res) => {
  // Recoger datos de la peticion
  let foodId = req.params.id;

  // Comprobar parametros requeridos
  if (!foodId || typeof foodId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    foodId = new ObjectId(foodId);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Food.findByIdAndUpdate(foodId, req.body)
    .then(
      (_) => {
        return res.status(200).json({
          status: "success",
          message: "Actualizado correctamente",
        });
      },
      { new: true }
    )
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Ha ocurrido un error: " + error,
      });
    });
};

const deleteFood = (req, res) => {
  // Recoger datos de la peticion
  let foodId = req.params.id;

  // Comprobar parametros requeridos
  if (!foodId || typeof foodId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    foodId = new ObjectId(foodId);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Food.findByIdAndDelete(foodId)
    .then((food) => {
      console.log(food);
      return res.status(200).json({
        status: "success",
        message: "Eliminado correctamente",
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Ha ocurrido un error: " + error,
      });
    });
};

const listOfSupermarkets = (req, res) => {
  return res.status(200).json({
    status: "success",
    supermarkets,
  });
};

module.exports = {
  test,
  food,
  create,
  update,
  deleteFood,
  listOfSupermarkets,
};
