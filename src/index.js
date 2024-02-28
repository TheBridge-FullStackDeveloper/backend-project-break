const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); 
require('dotenv').config();

//Rutas
const routes = require('./routes/productRoutes');
const routesAuth = require('./routes/authRoutes');

app.use('/register', routesAuth);
//Conexión a BD
const { dbConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/', routes);
app.use(routesAuth);

//Assets y estilos CSS
const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
});
