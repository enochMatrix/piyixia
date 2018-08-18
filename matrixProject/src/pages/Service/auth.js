
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


export default class AuthService {

  config = {
    apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
    authDomain: "piyixia-562cf.firebaseapp.com",
    databaseURL: "https://piyixia-562cf.firebaseio.com",
    projectId: "piyixia-562cf",
    storageBucket: "piyixia-562cf.appspot.com",
    messagingSenderId: "157139696379"
  };

  db = null;

  constructor() {

    if (!firebase.apps.length) {
      console.log(firebase.length);
      firebase.initializeApp(this.config);
    }
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }

  login = (email, password) => {

    return firebase.auth().signInWithEmailAndPassword(email, password);

  }

  isAuthenticated = () => {

    return !!firebase.auth().currentUser;

  }

  getUser = () => {

    return firebase.auth().currentUser;

  }

  addUserToDatabase = (userData) => {

    if (userData.uid) {
      this.db.collection("user").doc(userData.uid).set(
        userData
      )
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    }


  }


}
