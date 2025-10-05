
// import {onMounted, ref} from 'vue'
//always import from the top

//initialize Firebase ----sth that was copied from firebase console(at one point)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore/* , collection, onSnapshot, addDoc, deleteDoc, doc */ } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxEyCSuCqo0h5qnYvwGVoASeOvl65h8Fs",
    authDomain: "finance-tracker-ca070.firebaseapp.com",
    projectId: "finance-tracker-ca070",
    storageBucket: "finance-tracker-ca070.firebasestorage.app",
    messagingSenderId: "428063726629",
    appId: "1:428063726629:web:a28ea871c0134171a073cc"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); //firestore database



export { db }

export const firebaseApp = app
