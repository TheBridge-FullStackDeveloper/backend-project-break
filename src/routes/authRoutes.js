const express = require("express");
const router = express.Router();
const controllerAuth = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas de autenticación
router.get('/registro', controllerAuth.createUser);
router.post('/registro', controllerAuth.saveUser);

router.get('/login', controllerAuth.loginUser);
router.post('/login', controllerAuth.checkUser);

module.exports = router;
