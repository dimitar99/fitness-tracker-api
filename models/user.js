const { Schema, model } = require("mongoose");

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: String,
    nick: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

// El tercer parametros es el nombre de la coleccion donde se almacenaran todos los usuarios.
// Si no le asignamos un nombre mongoose llamara a la coleccion de objetos User "users"
module.exports = model("User", UserSchema, "users");
