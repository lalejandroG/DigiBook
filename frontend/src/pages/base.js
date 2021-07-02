import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAKqs5mBeH_1n2PIXN5cFiZBbVx7XSw990",
  authDomain: "digibook-ffb1b.firebaseapp.com",
  projectId: "digibook-ffb1b",
  storageBucket: "digibook-ffb1b.appspot.com",
  messagingSenderId: "916904929327",
  appId: "1:916904929327:web:09dbae478a0a39aae47eda",
  measurementId: "G-6DMYYK6JFQ"
};
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default};