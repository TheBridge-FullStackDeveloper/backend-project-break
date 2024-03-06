require('dotenv').config();
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
const {initializeApp} = require('firebase/app')
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPI,
  authDomain: "my-denda.firebaseapp.com",
  projectId: "my-denda",
  storageBucket: "my-denda.appspot.com",
  messagingSenderId: "860702504622",
  appId: "1:860702504622:web:f820dfeb49117098ffdf3f"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

module.exports = fireBaseApp;
/*
const admin = require('firebase-admin');
const {initializeApp, applicationDefault} = require('firebase-admin/app');


const fireBaseApp = admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS)
})
module.exports = fireBaseApp
*/


