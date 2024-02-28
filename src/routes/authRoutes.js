const express = require("express");
const router = express.Router();
const controllerAuth = require('../controllers/authController');

router.get('/register', controllerAuth.createUser);
router.post('/register', controllerAuth.saveUser);

router.get('/login', controllerAuth.loginUser);
router.post('/login', controllerAuth.checkUser);

module.exports = router;