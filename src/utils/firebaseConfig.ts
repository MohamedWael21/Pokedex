// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAHYmPPO0IM5EYeQgImRbmtOHj0ugDZok",
  authDomain: "pokedex-93359.firebaseapp.com",
  projectId: "pokedex-93359",
  storageBucket: "pokedex-93359.appspot.com",
  messagingSenderId: "38034308628",
  appId: "1:38034308628:web:5d2dcd54d04f8e84a6b101",
  measurementId: "G-2ZXM9EQQKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
