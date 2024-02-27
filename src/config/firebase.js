const firebase = require('firebase/app');

// Configuración de Firebase
const firebaseConfig = {
  projectId: "project-822173276186"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Exportar la configuración de Firebase
module.exports.firebaseConfig = firebaseConfig;

// Exportar funciones relacionadas con Firebase
module.exports.verificarCredenciales = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

module.exports.cerrarSesion = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    throw error;
  }
};
