import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDK-k9DMx0lyqNZiEdHOOoeeHuoCbBC0mY",
    authDomain: "digibook-70303.firebaseapp.com",
    projectId: "digibook-70303",
    storageBucket: "digibook-70303.appspot.com",
    messagingSenderId: "694500313174",
    appId: "1:694500313174:web:91f478fabae709b53b93f7",
    measurementId: "G-KN0DKMMZME"
  };
  // Initialize Firebase

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default};