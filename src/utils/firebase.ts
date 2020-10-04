import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDK8-aPh4p7-o6V0Oi_YCRMlVJi2IaIlug",
  authDomain: "accessibility-forum.firebaseapp.com",
  databaseURL: "https://accessibility-forum.firebaseio.com",
  projectId: "accessibility-forum",
  storageBucket: "accessibility-forum.appspot.com",
  messagingSenderId: "66162461369",
  appId: "1:66162461369:web:7a04e417111073188c2968"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export const firebaseAuth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();