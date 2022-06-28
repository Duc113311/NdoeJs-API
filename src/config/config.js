// // import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyAP76I2VUVJtzUV3rLZ5awO8l7Oq2J1X2A",
  authDomain: "application-bitri.firebaseapp.com",
  projectId: "application-bitri",
  storageBucket: "application-bitri.appspot.com",
  messagingSenderId: "638359965627",
  appId: "1:638359965627:web:24de152f18a02d1c03fe9e",
  measurementId: "G-L826B5PSRQ",
};

// // firebase.initializeApp(firebaseConfig)
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

export default db
