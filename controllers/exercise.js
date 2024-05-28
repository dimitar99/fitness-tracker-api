const Exercise = require("../models/exercise");
const { ObjectId } = require("mongodb");

const test = (_, res) => {
  return res.status(200).json({
    message: "Test from exercise controller",
  });
};

const exercises = (_, res) => {
  Exercise.find({})
    .then((exercises) => {
      if (exercises && exercises.length >= 1) {
        return res.status(200).json({
          status: "success",
          exercises,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado ejercicios",
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
  if (!params.title || !params.description) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  Exercise.find({
    $and: [{ title: params.title }],
  }).then(async (exercise) => {
    if (exercise && exercise.length >= 1) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe el ejercicio",
      });
    } else {
      const exercise_to_save = new Exercise(params);

      exercise_to_save
        .save()
        .then((exercise) => {
          return res.status(200).json({
            status: "status",
            message: "created successfully",
            exercise,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error: " + error,
          });
        });
    }
  });
};

const update = (req, res) => {
  // Recoger datos de la peticion
  let exerciseId = req.params.id;

  console.log(exerciseId);

  // Comprobar parametros requeridos
  if (!exerciseId || typeof exerciseId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    exerciseId = new ObjectId(exerciseId);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Exercise.findByIdAndUpdate(exerciseId, req.body)
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

const deleteExercise = (req, res) => {
  // Recoger datos de la peticion
  let exerciseId = req.params.id;

  // Comprobar parametros requeridos
  if (!exerciseId || typeof exerciseId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    exerciseId = new ObjectId(exerciseId);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Exercise.findByIdAndDelete(exerciseId)
    .then((_) => {
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

module.exports = {
  test,
  exercises,
  create,
  update,
  deleteExercise,
};
