import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import {connect} from 'react-redux';
import Form from './components/form';
import wallpaper from './components/background';
import buttonsubmit from './components/submitButton';
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    counter:0
  }

  render() {

  return (
    <wallpaper>
      <Form/>
      <buttonsubmit/>
      </wallpaper>
    );
  }
}


export default LoginPage;
