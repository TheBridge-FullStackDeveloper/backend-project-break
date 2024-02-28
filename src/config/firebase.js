const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuH2ML1GKE41wtdNlGV-f-iX9s20FojOc",
    authDomain: "proyecto-tienda-21fae.firebaseapp.com",
    projectId: "proyecto-tienda-21fae",
    storageBucket: "proyecto-tienda-21fae.appspot.com",
    messagingSenderId: "798675833163",
    appId: "1:798675833163:web:73a0a91edf44a913af18ce",
    measurementId: "G-X9ERBX0SXR"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

console.log("URL de la base de datos Firebase:", JSON.stringify(app.options));
console.log('BD: ' + database)
