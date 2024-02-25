const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path'); 

require('dotenv').config();

const { dbConnection } = require('./config/db');
const routes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.json());

const publicPath = path.resolve(__dirname, '..', 'public');
app.use(express.static(publicPath));

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
});
