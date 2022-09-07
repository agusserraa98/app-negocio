// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhEvJD-yvk-bQ2V22sht1ggGuy44KEdWU",
  authDomain: "app-negocio-b8793.firebaseapp.com",
  projectId: "app-negocio-b8793",
  storageBucket: "app-negocio-b8793.appspot.com",
  messagingSenderId: "528842252455",
  appId: "1:528842252455:web:49ee2d8b11a4f189fa7b82",
  measurementId: "G-7BRFY59B83"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp;