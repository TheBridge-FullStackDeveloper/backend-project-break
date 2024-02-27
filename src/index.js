const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); 
const session = require('express-session');
require('dotenv').config();

//Rutas
const routes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

//Conexión a BD
const { dbConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', routes);
app.use('/', authRoutes);

//Assets y estilos CSS
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

//Configuración de la sesión
app.use(session({
    secret: process.env.PALABRA_SECRETA || 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
});
