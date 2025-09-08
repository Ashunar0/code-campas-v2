import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACFaIDctQNTGNpVbAbCtWONx7RT11N5UY",
  authDomain: "codecampas.firebaseapp.com",
  projectId: "codecampas",
  storageBucket: "codecampas.firebasestorage.app",
  messagingSenderId: "302444003148",
  appId: "1:302444003148:web:4cc382eb5e226bc10f99e9",
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { app, db, auth };
