import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyBnFz5v94AS_4TYFORDL-a4nLbAfDUM_p8",
  authDomain: "oauthsafe.firebaseapp.com",
  projectId: "oauthsafe",
  storageBucket: "oauthsafe.appspot.com",
  messagingSenderId: "743178513619",
  appId: "1:743178513619:web:aea33e089f5b85d245b826",
  measurementId: "G-CSWCWXB66L"
};


export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage(app);