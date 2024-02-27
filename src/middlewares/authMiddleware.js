//Comprobar si el usuario está logueado
const verificarAutenticacion = (req, res, next) => {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = verificarAutenticacion;
