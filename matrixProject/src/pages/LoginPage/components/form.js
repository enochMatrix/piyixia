import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';

import {
    StyleSheet,
    KeyboardAvoidingView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Image,
  } from 'react-native';
  
  import UserInput from './userInput';
  import ButtonSubmit from './submitButton';


  export default class from extends Component {

    constructor(props){
        super(props);

        this.state = {
            showPass: true,
            press: false,
        }

        
    }

    showPass = () => {
        this.state.press === false ?
        this.setState({showPass: false, press: true}) : this.setState({showPass: true, press: false})
    }

    render() {
        return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <UserInput
              source={usernameImg}
              placeholder="Username"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
            />
            <UserInput
              source={passwordImg}
              secureTextEntry={this.state.showPass}
              placeholder="Password"
              returnKeyType={'done'}
              autoCapitalize={'none'}
              autoCorrect={false}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btnEye}
              onPress={this.showPass}>
              <Image source={eyeImg} style={styles.iconEye} />
            </TouchableOpacity>
          </KeyboardAvoidingView>
        );
      }
    }

  }