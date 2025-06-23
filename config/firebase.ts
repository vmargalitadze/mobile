
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJuqbqDgHkIdpN8_ptMh2pfaLsN9Zkkp0",
  authDomain: "react-native-5a627.firebaseapp.com",
  projectId: "react-native-5a627",
  storageBucket: "react-native-5a627.firebasestorage.app",
  messagingSenderId: "656148639738",
  appId: "1:656148639738:web:58fa0a725693458d74fe43",
  measurementId: "G-0RXREVL9YE"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;