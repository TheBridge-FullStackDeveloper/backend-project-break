
function verifyToken (req, res, next){
    const token = req.token;
    console.log(token)
    if(!token){
        res.send('token invalido')
    }
    next();
}

module.exports = verifyToken