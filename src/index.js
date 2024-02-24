const express = require('express');
const app = express();
require('dotenv').config();
const { dbConnection } = require('./config/db');

const PORT = process.env.PORT || 3000;

app.use(express.json());

dbConnection();

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`)
});
