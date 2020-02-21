import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAAdn0S7r79ahWIEzqo6xXvp_45Zt_g7fM",
    authDomain: "painikepeli-9d6dc.firebaseapp.com",
    databaseURL: "https://painikepeli-9d6dc.firebaseio.com",
    projectId: "painikepeli-9d6dc",
    storageBucket: "painikepeli-9d6dc.appspot.com",
    messagingSenderId: "907941738155",
    appId: "1:907941738155:web:508112c9e8e555c0b669ee",
    measurementId: "G-ES9TXDBJ6R"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebaseApp.firestore()