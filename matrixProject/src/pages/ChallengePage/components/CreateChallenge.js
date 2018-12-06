import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, DatePickerIOS, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import challengeManager from "../../Service/challengeControl";
import userManager from '../../Service/auth';

class CreateChallenge extends Component {

  constructor(props) {
    super(props);
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
  }

  makeid = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  createNewChallenge = () => {
    let date = new Date(Date.now());
    let user = UserManager.getCurrentUser().then((response) => {

      const challenge = {
        uid: "",
        content:"",
        author: "",
        title: "",
        date: date
      }


      challengeManager.createChallenge(newChallenge).then(() => {
        this.props.navigation.navigate('ChallengePage');
      }).catch(e);
      
    }).catch(e);
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'space-around' }}>
          <Text> 挑战创建</Text>
          <Text>挑战标题</Text>
          <TextInput
            onChangeText={(text) => {
              this.setState({ title: text });
            }}
            style={{ marginLeft: 5, height: 30, width: 200, borderColor: 'gray', borderWidth: 1 }}
          />

          <Text>挑战描述</Text>
          <TextInput
            onChangeText={(text) => {
              this.setState({ description: text });
            }}
            style={{ marginLeft: 5, height: 80, width: 300, borderColor: 'gray', borderWidth: 1 }}
          />


          <Text>挑战截止日期</Text>
        </View>
        <View style={{ flex: 0.3 }}>
          <DatePickerIOS
            date={"habibi"}
            onDateChange={(date) => { this.setDate(date); }}
            style={{ backgroundColor: 'white' }}
          />
        </View>
        <TouchableOpacity
          style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}
      
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
