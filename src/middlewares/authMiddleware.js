const {getAuth} = require('firebase/auth');
const firebaseApp = require('../config/firebase');
const jwt = require('jsonwebtoken');
const {hashedSecret} = require('../config/configcryp')

const auth = getAuth(firebaseApp);

function generateToken(user){
    return jwt.sign({user: user.uid},hashedSecret, {expiresIn: '1h'})
}



const authenticate = async (req, res, next) =>{

    const token = req.session.token;
    if(!token){
        return res.status(401).json({mensaje:'token no generado'});
    }
    jwt.verify(token, hashedSecret, (err, decoded)=>{
        if(err){
            return res.status(401).json({mensaje:'token invalido'});
        }
        req.user = decoded.user;
        next();
    })
    
    /*
    try {
       const idToken = req.headers.authorization;
       const decodedToken = await auth.verifyIdToken(idToken);
       req.user = decodedToken;
       next();       
        
    } catch (error) {
        res.status(401).json({ success: false, error: "Unauthorized user" });
    }*/
}

module.exports = {authenticate, generateToken}