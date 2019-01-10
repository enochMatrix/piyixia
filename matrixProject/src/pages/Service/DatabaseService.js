import axios from 'axios';


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

  getChaTargets = (target) => {
    axios.get('/challenges')
      .then((response) => {

      })
      .catch((error) => { 
          console.log(error);
      });
  }



  post = (target, body) => {

    const Reference = this.db.collection(target);
    Reference.set(body);

  }

  getTargets = (target) => {

    const Reference = this.db.collection(target);
    return Reference.get();
  }


}