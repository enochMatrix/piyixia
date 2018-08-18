import firebase from 'firebase/app';
import 'firebase/firestore';


export default class FileStorageService {

    config = {
        apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
        authDomain: "piyixia-562cf.firebaseapp.com",
        databaseURL: "https://piyixia-562cf.firebaseio.com",
        projectId: "piyixia-562cf",
        storageBucket: "piyixia-562cf.appspot.com",
        messagingSenderId: "157139696379"
    };

    storage = null;

    constructor() {
        if (!firebase.apps.length) {
            console.log(firebase.length);
            firebase.initializeApp(this.config);
        }
        this.db = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        this.db.settings(settings);
    }

    downloadVideo = () => {
        var jsonData = [];
        this.db.collection("Videos")
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    jsonData.push(doc.data);
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        return jsonData;
    }


}