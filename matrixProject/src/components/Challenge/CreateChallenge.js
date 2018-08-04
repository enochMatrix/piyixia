import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, DatePickerIOS, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

class CreateChallenge extends Component {

  constructor(props) {
      super(props);
      this.send = this.send.bind(this);
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

    send() {
      fetch('http://172.17.69.105:3000/add/challenge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
          title: this.state.title,
          description: this.state.description,
          y: this.state.year,
          m: this.state.chosenDate.getMonth(),
          d: this.state.chosenDate.getDate(),
          h: this.state.chosenDate.getHours()
        })
          })
        .then((response) => (response.text()))
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
          Alert.alert(res);
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
