// utils/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Замените данные ниже своими из Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyAXXGbXqiP0zwU19GfWZc0YVcs_A0pCuYA",
  authDomain: "ecotrack-yelizaveta.firebaseapp.com",
  projectId: "ecotrack-yelizaveta",
  storageBucket: "ecotrack-yelizaveta.firebasestorage.app",
  messagingSenderId: "749589795548",
  appId: "1:749589795548:web:fa2422634f75a800685a19",
  measurementId: "G-JV9GBR4XME"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
