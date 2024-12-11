// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsTLHBc0-7MJkyzTOZDt7NDIF7dhK9AFM",
  authDomain: "papercheese-c8dca.firebaseapp.com",
  projectId: "papercheese-c8dca",
  storageBucket: "papercheese-c8dca.firebasestorage.app",
  messagingSenderId: "122053304752",
  appId: "1:122053304752:web:50cb3342ce41f3c7593675",
  measurementId: "G-8FL3YXLR05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { RecaptchaVerifier, signInWithPhoneNumber };