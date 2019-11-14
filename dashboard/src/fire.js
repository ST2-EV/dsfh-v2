import firebase from "firebase/app";
import "firebase/auth"; // for authentication
import "firebase/storage"; // for storage
import "firebase/database"; // for realtime database
import "firebase/firestore"; // for cloud firestore
import "firebase/messaging"; // for cloud messaging
import "firebase/functions";

const firebaseApp = firebase.initializeApp({
  // copy and paste your firebase credential here
  apiKey: "AIzaSyDxE7tOSORmr7EWRAAx2E61938KsTVouM4",
  authDomain: "dsfh-6ead5.firebaseapp.com",
  databaseURL: "https://dsfh-6ead5.firebaseio.com",
  projectId: "dsfh-6ead5",
  storageBucket: "dsfh-6ead5.appspot.com",
  messagingSenderId: "1049064576276",
  appId: "1:1049064576276:web:a9688582b582e59bda9e01",
  measurementId: "G-8G0DT9ESQT"
});

const db = firebaseApp.firestore();

export { db };
