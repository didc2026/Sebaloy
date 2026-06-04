import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCiBwLYtQl4-U0oE4rAa_Gpj5P_ntOVmFc",
  authDomain: "sebaloy-b75f1.firebaseapp.com",
  projectId: "sebaloy-b75f1",
  storageBucket: "sebaloy-b75f1.firebasestorage.app",
  messagingSenderId: "591283378121",
  appId: "1:591283378121:web:a2876d3b6483912880ba18",
  measurementId: "G-496BQN3P9D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);