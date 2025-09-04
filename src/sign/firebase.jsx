// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // ✅ import auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQo1y2u_0zMvvwCkSRqinflDIWrgbuKhY",
  authDomain: "strokeriskapp.firebaseapp.com",
  projectId: "strokeriskapp",
  storageBucket: "strokeriskapp.firebasestorage.app",
  messagingSenderId: "156937977814",
  appId: "1:156937977814:web:870b6e21d91f3c8c366e77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Auth
export const auth = getAuth(app);
