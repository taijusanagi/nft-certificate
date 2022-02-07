import "firebase/functions";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { getAnalytics } from "firebase/analytics";
import { getApps, initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

import firebaseJson from "../../../../firebase.json";

export const initFirebase = () => {
  if (getApps().length === 0) {
    const firebaseProdConfig = {
      apiKey: "AIzaSyDXwktzwOmMYVIWL6LU4xKE4KKs-MgyyVs",
      authDomain: "nftcert-prod.firebaseapp.com",
      projectId: "nftcert-prod",
      storageBucket: "nftcert-prod.appspot.com",
      messagingSenderId: "826681063750",
      appId: "1:826681063750:web:07ea79cda5ba50733f4d47",
      measurementId: "G-P5RL06581E",
    };
    const firebaseConfig = firebaseProdConfig;
    initializeApp(firebaseConfig);
    const auth = getAuth();
    const firestore = getFirestore();
    const functions = getFunctions();
    functions.region = "asia-northeast1";
    if (process.env.NODE_ENV === "production") {
      getAnalytics();
      setPersistence(auth, inMemoryPersistence);
    } else {
      connectAuthEmulator(auth, `http://localhost:${firebaseJson.emulators.auth.port}`);
      connectFirestoreEmulator(firestore, "localhost", firebaseJson.emulators.firestore.port);
      connectFunctionsEmulator(functions, "localhost", firebaseJson.emulators.functions.port);
    }
  }
};
