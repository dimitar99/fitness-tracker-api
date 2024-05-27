// Importar dependencias
const { connection } = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida
console.log("*************************************************");
console.log("STARTED FITNESS TRACKER");

// Conexion a la bbdd
connection();

// Crear servidor node
const app = express();
const port = 3900;

// Configurar cors
app.use(cors());

// Convertir los datos del body a objetos js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar rutas
const UserRoutes = require("./routes/user");
const FoodRoutes = require("./routes/food");
const ExerciseRoutes = require("./routes/exercise");
const RoutinesRoutes = require("./routes/routines");

app.use("/user", UserRoutes);
app.use("/food", FoodRoutes);
app.use("/exercises", ExerciseRoutes);
app.use("/routines", RoutinesRoutes);

// Ruta de prueba
app.get("/test", (req, res) => {
  return res.status(200).json({
    msg: "Esto es una prueba",
  });
});

// Poner servidor a escuchar peticiones http
app.listen(port, () => {
  console.log("*************************************************");
  console.log("Server running on port", port);
});
