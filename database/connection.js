// Importamos mongoose
const mongoose = require("mongoose");

// Método para la conexion a la bbdd
const connection = async () => {
    try {
        await mongoose.connect("mongodb+srv://dimitar1999de:v21y5XTOixy8gLIt@cluster0.uvsnnfb.mongodb.net/fitness_tracker");
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