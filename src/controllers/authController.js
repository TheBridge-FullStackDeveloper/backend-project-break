const {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const fireBaseApp = require('../config/firebase');

const auth = getAuth(fireBaseApp);

const signIn = async (auth, email, password) =>{
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;        
        return user;
        
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
    }
}

const singUp = async (auth, email, password) =>{
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user;
        console.log('user', user.uid)
        return user;
    } catch (error) {
        console.error("Error signing up:", error);
        throw error;
    }
}
module.exports = {signIn, singUp};