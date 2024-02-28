const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuH2ML1GKE41wtdNlGV-f-iX9s20FojOc",
    authDomain: "proyecto-tienda-21fae.firebaseapp.com",
    projectId: "proyecto-tienda-21fae",
    databaseURL: "https://proyecto-tienda-21fae-default-rtdb.europe-west1.firebasedatabase.app/",
    messagingSenderId: "798675833163",
    appId: "1:798675833163:web:73a0a91edf44a913af18ce",
    measurementId: "G-X9ERBX0SXR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Referencia a la raíz de la base de datos
const rootRef = ref(database);

// Escucha los cambios en los datos
onValue(rootRef, (snapshot) => {
    const data = snapshot.val();
    console.log("Datos de la base de datos:", data);
});