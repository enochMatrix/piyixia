import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
  authDomain: "piyixia-562cf.firebaseapp.com",
  databaseURL: "https://piyixia-562cf.firebaseio.com",
  projectId: "piyixia-562cf",
  storageBucket: "piyixia-562cf.appspot.com",
  messagingSenderId: "157139696379"
};


export default class DatabaseService {

  
  constructor() {
  
    if (!firebase.apps.length) {
      console.log(firebase.length);
      firebase.initializeApp(config);
    }
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }



  post = (target, body) => {

    const Reference = this.db.collection(target);
    Reference.set(body);

  }

  get = (target) => {
    const Reference = this.db.collection(target);
    return Reference.get();
  }


}