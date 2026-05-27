// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8DRaYhHBC0RcfKkIq3qciLTQtuNjJ5q0",
  authDomain: "dario-blog-fotos.firebaseapp.com",
  projectId: "dario-blog-fotos",
  storageBucket: "dario-blog-fotos.firebasestorage.app",
  messagingSenderId: "796227845234",
  appId: "1:796227845234:web:6252d97c169a5aa0bd96eb",
  measurementId: "G-G6FYH90GC2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

