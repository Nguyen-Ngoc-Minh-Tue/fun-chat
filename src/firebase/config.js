import firebase from "firebase/app";

import "firebase/analytics"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDtiia1AYCv2DqswaEpdaog4z8oiIy4_kI",
    authDomain: "fun-chat-46fe3.firebaseapp.com",
    projectId: "fun-chat-46fe3",
    storageBucket: "fun-chat-46fe3.appspot.com",
    messagingSenderId: "1041737117281",
    appId: "1:1041737117281:web:ed7d5ea9e0087ac103c420",
    measurementId: "G-T05HSR7QJY"
};

firebase.initializeApp(firebaseConfig)
firebase.analytics()

const auth = firebase.auth()
const db = firebase.firestore()

export { auth, db };
export default firebase