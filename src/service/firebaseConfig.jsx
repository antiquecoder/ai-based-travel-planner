// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.apiKey,
  authDomain: "ai-trip-planner-4dede.firebaseapp.com",
  projectId: "ai-trip-planner-4dede",
  storageBucket: "ai-trip-planner-4dede.firebasestorage.app",
  messagingSenderId: "51885957010",
  appId: "1:51885957010:web:1bac21da6f6aa4e9d72b4b",
  measurementId: "G-G7QE30NXM7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
// const analytics = getAnalytics(app);