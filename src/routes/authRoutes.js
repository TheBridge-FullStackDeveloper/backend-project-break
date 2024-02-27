const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

//Login
router.get("/login", authController.showFormLogin);

//Registro
router.get("/register", authController.showFormRegister);

module.exports = router;