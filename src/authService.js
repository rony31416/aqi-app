// src/authService.js
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";
import { getFirestore } from "firebase/firestore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign up with email and password
export const signUpWithEmail = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    throw new Error("User not found. Please check your credentials or sign up.");
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

// Sign out
export const signOutUser = async () => {
  return await signOut(auth);
};

export const db = getFirestore(app);
export { auth };
