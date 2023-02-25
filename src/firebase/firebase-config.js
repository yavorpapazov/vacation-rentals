import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBhdnnMx3LV6M6VYmVViOplfYGHnHP0k6E",
  authDomain: "react-project-70cfc.firebaseapp.com",
  databaseURL: "https://react-project-70cfc-default-rtdb.firebaseio.com",
  projectId: "react-project-70cfc",
  storageBucket: "react-project-70cfc.appspot.com",
  messagingSenderId: "382307112273",
  appId: "1:382307112273:web:1d51293e7b0b7d7ab3ef70"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app);