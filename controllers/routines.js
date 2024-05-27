const Routine = require("../models/routine");
const { ObjectId } = require("mongodb");

const test = (_, res) => {
  return res.status(200).json({
    message: "Test from routine controller",
  });
};

const routines = (_, res) => {
  Routine.find({})
    .then((routines) => {
      if (routines && routines.length >= 1) {
        return res.status(200).json({
          status: "success",
          routines,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado rutinas",
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

const getByDate = (req, res) => {
  // Recoger datos de la peticion
  let params = req.query;

  if (!params.date) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  console.log(params.date);
  const date = new Date(params.date);

  if (isNaN(date.getTime())) {
    return res.status(400).send({
      status: "error",
      message: 'El parámetro "day" debe ser una fecha válida.',
    });
  }

  Routine.find({ $and: [{ day: date }] })
    .then((routines) => {
      if (routines && routines.length >= 1) {
        const routine = routines[0];
        return res.status(200).json({
          status: "success",
          routine,
        });
      } else {
        return res.status(404).json({
          status: "error",
          message: "No se han encontrado rutinas",
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
    !params.description ||
    !params.exercises ||
    !params.day
  ) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  const date = new Date(params.day);

  if (isNaN(date.getTime())) {
    return res.status(400).send({
      status: "error",
      message: 'El parámetro "day" debe ser una fecha válida.',
    });
  }

  Routine.find({
    $and: [{ title: params.title }],
  }).then(async (routine) => {
    if (routine && routine.length >= 1) {
      return res.status(409).json({
        status: "error",
        message: "Ya existe la rutina",
      });
    } else {
      console.log("params " + params);
      params.day = date;
      const routine_to_save = new Routine(params);

      routine_to_save
        .save()
        .then((routine) => {
          return res.status(200).json({
            status: "status",
            message: "created successfully",
            routine,
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
  let routineId = req.params.id;

  console.log(routineId);

  // Comprobar parametros requeridos
  if (!routineId || typeof routineId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    routineId = new ObjectId(routineId);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Routine.findByIdAndUpdate(routineId, req.body)
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

const deleteRoutine = (req, res) => {
  // Recoger datos de la peticion
  let routineId = req.params.id;

  // Comprobar parametros requeridos
  if (!routineId || typeof routineId !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Falta el id o es incorrecto",
    });
  }

  try {
    routineId = new ObjectId(routineId);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Id incorrecto",
    });
  }

  Routine.findByIdAndDelete(routineId)
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
  routines,
  getByDate,
  create,
  update,
  deleteRoutine,
};
