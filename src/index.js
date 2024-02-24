const express = require('express');
const app = express();
const bodyParser = require('body-parser');

require('dotenv').config();

const { dbConnection } = require('./config/db');
const routes = require('./routes/productRoutes');

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);
app.use(express.json());

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
});
