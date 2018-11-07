

import bottle from "../bottle";


export default class ChallengeControl {

  constructor() {

    this.dbManager = dbManager();
  }


  getChallenges = () => {

    bottle.container.DBService.get("Challenge").then(function(snapshot) {
      snapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
        jsonObject.push(doc.data());
    });
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
    return jsonObject;

  }

  createChallenge = (challengeBody) => {
      
     this.dbManager.post('Challenge',challengeBody);

  }

  

}
