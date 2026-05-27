import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8DRaYhHBC0RcfKkIq3qciLTQtuNjJ5q0",
  authDomain: "dario-blog-fotos.firebaseapp.com",
  projectId: "dario-blog-fotos",
  storageBucket: "dario-blog-fotos.firebasestorage.app",
  messagingSenderId: "796227845234",
  appId: "1:796227845234:web:6252d97c169a5aa0bd96eb",
  measurementId: "G-G6FYH90GC2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
