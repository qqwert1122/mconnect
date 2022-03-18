// Import the functions you need from the SDKs you need
import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUS6qAw8b-PwqK0LG7Px0UeRgMq9mJq3M",
  authDomain: "connect-memo-16299.firebaseapp.com",
  projectId: "connect-memo-16299",
  storageBucket: "connect-memo-16299.appspot.com",
  messagingSenderId: "902980916094",
  appId: "1:902980916094:web:1adb90da6c02d5e104592f",
  measurementId: "G-CPH06GG8V8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { firebase, firebaseApp, db };
