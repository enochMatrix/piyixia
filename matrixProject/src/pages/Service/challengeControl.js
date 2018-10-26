
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



export default class CommentService {

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
    console.log("db is here");
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }


  getComments = () => {

    return firebase.auth().currentUser;

  }

  getChallenges = () => {

    var docRef = this.db.collection("Challenge");
    var jsonObject = [];
    console.log(docRef);
    docRef.get().then(function(snapshot) {
      snapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        jsonObject.push(doc.data());
    });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    return jsonObject;

  }

  createChallenge = () =>{

    
  }

  

}
