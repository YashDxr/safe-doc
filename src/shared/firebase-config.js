// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnFz5v94AS_4TYFORDL-a4nLbAfDUM_p8",
  authDomain: "oauthsafe.firebaseapp.com",
  projectId: "oauthsafe",
  storageBucket: "oauthsafe.appspot.com",
  messagingSenderId: "743178513619",
  appId: "1:743178513619:web:aea33e089f5b85d245b826",
  measurementId: "G-CSWCWXB66L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();