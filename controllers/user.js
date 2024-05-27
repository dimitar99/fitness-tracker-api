const bcrypt = require("bcrypt");
const User = require("../models/user");

const test = (req, res) => {
  return res.status(200).json({
    message: "Test from user controller",
  });
};

const register = (req, res) => {
  // Parametros de la peticion
  let params = req.body;

  console.log(params);

  // Comprobar parametros requeridos
  if (!params.name || !params.nick || !params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // Control de usuarios duplicados
  // $or -> se tiene que cumplir alguna de las condiciones
  User.find({
    $or: [
      { email: params.email.toLowerCase() },
      { nick: params.nick.toLowerCase() },
    ],
  })
    .then(async (users) => {
      // Usuario ya existente con ese nick o email
      if (users && users.length >= 1) {
        return res.status(409).json({
          status: "error",
          message: "El usuario ya existe",
        });
      }

      // Cifrar la contraseña
      let pass = await bcrypt.hash(params.password, 10);
      params.password = pass;

      // Crear objeto usuario
      const user_to_save = new User(params);

      // Guardar usuario
      user_to_save
        .save()
        .then((user) => {
          return res.status(200).json({
            status: "success",
            message: "Usuario creado correctamente",
            user,
          });
        })
        .catch((error) => {
          return res.status(500).json({
            status: "error",
            message: "Ha ocurrido un error: " + error,
          });
        });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Ha ocurrido un error: " + error,
      });
    });
};

const login = (req, res) => {
  // Recoger datos de la peticion
  let params = req.body;

  // Comprobar parametros requeridos
  if (!params.email || !params.password) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar",
    });
  }

  // Buscar usuario
  User.findOne({ email: params.email })
    .then((user) => {
        console.log( `user (${typeof user}):`, user );
      // Comparamos contraseñas
      const password = bcrypt.compareSync(params.password, user.password);
      if (!password) {
        return res.status(401).json({
          status: "error",
          message: "Credenciales incorrectas",
        });
      }
      
      // Eliminar password
      const user_without_password = user.toJSON();
      delete user_without_password.password;

      // Login correcto
      return res.status(200).json({
        status: "success",
        message: "Login correcto",
        user: user_without_password,
      });
    })
    .catch((_) => {
      return res.status(404).json({
        status: "error",
        message: "No existe el usuario",
      });
    });
};

module.exports = {
  test,
  register,
  login,
};
