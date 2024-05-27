// Importamos mongoose
const mongoose = require("mongoose");

// Método para la conexion a la bbdd
const connection = async () => {
    try {
        await mongoose.connect("ac-109a3xk-shard-00-00.uvsnnfb.mongodb.net:27017/fitness_tracker");
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