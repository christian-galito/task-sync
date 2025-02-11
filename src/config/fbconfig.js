import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT95i2lSRGo93hsVQE1eW1FPlFXmK_3Xg",
  authDomain: "tasksync-cgalito.firebaseapp.com",
  projectId: "tasksync-cgalito",
  storageBucket: "tasksync-cgalito.firebasestorage.app",
  messagingSenderId: "384926154172",
  appId: "1:384926154172:web:8308de341810ee3629bfb9",
  measurementId: "G-G2M0HJEZEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
