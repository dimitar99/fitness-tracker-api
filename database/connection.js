// Importamos mongoose
const mongoose = require("mongoose");

// Método para la conexion a la bbdd
const connection = async () => {
    try {
        // Local
        await mongoose.connect("mongodb://localhost:27017/fitness_tracker", {
        // Producción
        // await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        console.log("*************************************************");
        console.log("Conectado a la bbdd fitness-tracker correctamente");
        console.log("*************************************************");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos !!");
    }
}
// Exportamos el método para que pueda ser usado en otro ficheros
module.exports = {
    connection
}