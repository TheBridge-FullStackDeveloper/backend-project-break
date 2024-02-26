const express = require('express');
const dbConnection = require('./config/db');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000
const router = require('./routes/productRoutes.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/', router);

dbConnection()

app.listen(PORT, () => {
    console.log(`Express está escuchando en el puerto http://localhost:${PORT}`)
})