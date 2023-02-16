// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxnObEW4ojVMSOoIgoXzo-imH07MU3KDE",
  authDomain: "react-curso-869eb.firebaseapp.com",
  projectId: "react-curso-869eb",
  storageBucket: "react-curso-869eb.appspot.com",
  messagingSenderId: "1036069285843",
  appId: "1:1036069285843:web:8abdcd4fc1fb602f4a8926"
};

// Initialize Firebase
export const FirebaseApp  = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth( FirebaseApp );

export const FirebaseDB   = getFirestore( FirebaseApp );