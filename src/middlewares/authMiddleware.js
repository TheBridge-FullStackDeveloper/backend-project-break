const session = require('express-session');
require('dotenv').config();

const checkSessionMiddleware = (req, res, next) => {
    // Verificar si existe una sesión activa
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = {
    checkSessionMiddleware
};
