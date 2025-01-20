// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm6damSlhJrguQzSciUww1k8JUo6RYTAQ",
  authDomain: "aqi-auth.firebaseapp.com",
  projectId: "aqi-auth",
  storageBucket: "aqi-auth.firebasestorage.app",
  messagingSenderId: "778501719523",
  appId: "1:778501719523:web:2cd1a4d6b78199ac278cd6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app; // Add this default export 