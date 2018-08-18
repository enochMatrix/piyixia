import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, DatePickerIOS, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';


class CreateChallenge extends Component {

  constructor(props) {
      super(props);
      this.send = this.send.bind(this);
      this.db = firebase.firestore();
      const settings = { timestampsInSnapshots: true };
      this.db.settings(settings);
    
      this.state = {
        title: '',
        description: '',
        year: 0,
        chosenDate: new Date()
      };
}

    setDate(newDate) {
        this.setState({ chosenDate: newDate });
    }

    makeid = () => {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }

    send() {
        var date = new Date(Date.now());
        console.log(date);
        this.db.collection("Challenge").doc("a10").set(
          { 
            title: this.state.title,
            description: this.state.description,
            diamond:0,
            currentTime: date,
            endTime: this.state.chosenDate,
            author:"大司马粉丝",
            url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSod0BSlenkixlcBikiYSJcOiHoMuf8uNbp90zw-sgb9R-sXcD1',
            thumbs:120,
            status:1
          }
        )
          .then(function () {
            console.log("challenge successfully written!");
            //this.props.navigation.navigate('ChallengePage');
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      
  
    }

    render() {
      return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

          <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'space-around' }}>
            <Text> WELCOME TO CHALLENGE CREATAION</Text>
            <Text>CHALLENGE TITLE</Text>
            <TextInput
               onChangeText={(text) => {
                 this.setState({ title: text });
               }}
               style={{ marginLeft: 5, height: 30, width: 200, borderColor: 'gray', borderWidth: 1 }}
            />

            <Text>CHALLENGE DESCRIPTION</Text>
            <TextInput
               onChangeText={(text) => {
                 this.setState({ description: text });
               }}
               style={{ marginLeft: 5, height: 80, width: 300, borderColor: 'gray', borderWidth: 1 }}
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View>
                <Text>CHALLENGE END YEAR</Text>
              </View>
            </TouchableWithoutFeedback>
            <TextInput
               onChangeText={(text) => {
                 this.setState({ year: text });
               }}
               keyboardType='number-pad'
               style={{ marginLeft: 5, height: 20, width: 100, borderColor: 'gray', borderWidth: 1 }}
            />
            <Text>CHALLENGE END DATE</Text>
          </View>
          <View style={{flex:0.3}}>
            <DatePickerIOS
              date={this.state.chosenDate}
              onDateChange={(date) => { this.setDate(date); }}
              style={{backgroundColor:'white'}}
            />
            </View>
            <TouchableOpacity
              style={{flex: 0.1, justifyContent: 'center', alignItems: 'center', marginTop: '10%'}}
              onPress={this.send}
            >
              <Text>确认发布</Text>
            </TouchableOpacity>
          </View>
      );
}
}

const styles = {

};

export default CreateChallenge;
