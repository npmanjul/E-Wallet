import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoG7LMkVQBL8znwFeUW4zvcuHWoVl6KNw",
  authDomain: "paypro-e2d3d.firebaseapp.com",
  projectId: "paypro-e2d3d",
  storageBucket: "paypro-e2d3d.firebasestorage.app",
  messagingSenderId: "381369119400",
  appId: "1:381369119400:web:61c20802986ca95052889d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
