import firebase from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXpVh-Iw3qjkhDT7ENzcOsgaS6GsAeQzA",
  authDomain: "my-puppy-magazine.firebaseapp.com",
  projectId: "my-puppy-magazine",
  storageBucket: "my-puppy-magazine.appspot.com",
  messagingSenderId: "536389405449",
  appId: "1:536389405449:web:8ccfb79620d6c0056ba1d8",
  measurementId: "G-VH284QMDVF"
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const firestore = firebase.firestore();
const auth = firebase.auth();

export { apiKey, firestore,auth };