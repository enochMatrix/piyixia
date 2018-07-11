import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    response: ''
  }
// 注册 api
  tryFetch = async () => {
  fetch('http://192.168.0.13/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify({ username: this.state.username, password: this.state.password })
      })
    .then((response) => (response.text()))
    .catch((error) => {
      console.log(error);
    })
    .then((res) => {
        this.setState({ response: res });
});
}
// 登陆 api
logIn = async () => {
fetch('http://192.168.0.13/login', {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
    },
  body: JSON.stringify({ username: this.state.username, password: this.state.password })
    })
  .then((response) => (response.text()))
  .catch((error) => {
    console.log(error);
  })
  .then((res) => {
      this.setState({ response: res });
      // 登陆成功： change props state and navigation to homepage
      console.log(res.localeCompare('登陆成功'));
});
};


  render() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <Text>UserName</Text>
        <TextInput
           onChangeText={(text) => {
             this.setState({ username: text });
           }}
           style={{ marginLeft: 5, height: 20, width: 100, borderColor: 'gray', borderWidth: 1 }}
        />
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text>PassWord</Text>
        <TextInput
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
           secureTextEntry
           style={{ marginLeft: 5, height: 20, width: 100, borderColor: 'gray', borderWidth: 1 }}
        />
      </View>
      <Button
        title='Register'
        color='black'
        onPress={this.tryFetch.bind(this)}
      />
      <Button
        title='Log In'
        color='black'
        onPress={this.logIn.bind(this)}
      />
      <Text style={{ marginTop: 10 }}>{this.state.response}</Text>
    </View>
    );
  }
}

export default LoginPage;
