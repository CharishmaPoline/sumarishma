// src/firebase.js

// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ ADD this line

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8Xyr6Hoe13KODDqlmOptrk_44GxWW-Uk",
  authDomain: "sumarishmaapp.firebaseapp.com",
  projectId: "sumarishmaapp",
  storageBucket: "sumarishmaapp.appspot.com", // ✅ Corrected
  messagingSenderId: "1024897832562",
  appId: "1:1024897832562:web:0d19880caf4d89af1f54eb",
  measurementId: "G-B3XFDJBFHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ ADD this line

// Export auth so it can be used in other files
export { auth };
