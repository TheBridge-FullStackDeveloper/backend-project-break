const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser:true, //para utilizar el nuevo analizador de URL de mongo
            useUnifiedTopology:true, // para utilizar la nueva capa de conexion
            useCreateIndex:true}) 
        console.log('Base de datos conectada con éxito')
    } catch (error) {
        console.log(error)
    }
}
module.exports = dbConnection;