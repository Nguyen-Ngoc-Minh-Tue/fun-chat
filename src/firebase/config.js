import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVDvfnCk7Mq3ZV6B5NYJVBwCvbtOBx-RE",
  authDomain: "chat-app-b00f0.firebaseapp.com",
  projectId: "chat-app-b00f0",
  storageBucket: "chat-app-b00f0.appspot.com",
  messagingSenderId: "442640220530",
  appId: "1:442640220530:web:e1a5e15c21ac5c3ff41deb",
  measurementId: "G-HEJJ31DJPC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore(app);

if (process.env.REACT_APP_CONNECT_EMULATOR === "true") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", "8080");
}

export { auth, db };
