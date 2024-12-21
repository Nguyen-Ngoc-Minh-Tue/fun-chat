import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvh5cCQ8a6jMRX1LamglPTyGlSICYQMr0",
  authDomain: "fun-chat-835e0.firebaseapp.com",
  projectId: "fun-chat-835e0",
  storageBucket: "fun-chat-835e0.firebasestorage.app",
  messagingSenderId: "885834601214",
  appId: "1:885834601214:web:5a4a5a7ca2c35fc3b0cbaf",
  measurementId: "G-1GV45222HC",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore(app);

if (process.env.REACT_APP_CONNECT_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", "8080");
}

export { auth, db };
