import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiBwLYtQl4-U0oE4rAa_Gpj5P_ntOVmFc",
  authDomain: "sebaloy-b75f1.firebaseapp.com",
  databaseURL: "https://sebaloy-b75f1-default-rtdb.firebaseio.com",
  projectId: "sebaloy-b75f1",
  storageBucket: "sebaloy-b75f1.firebasestorage.app",
  messagingSenderId: "591283378121",
  appId: "1:591283378121:web:a2876d3b6483912880ba18",
  measurementId: "G-496BQN3P9D",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);