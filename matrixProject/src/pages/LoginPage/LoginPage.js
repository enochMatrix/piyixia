import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import {connect} from 'react-redux';
class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    counter:0
  }

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
        title='Log In Using FireBase'
        color='black'
        onPress={() => {
          this.props.decCounter();
          this.props.navigation.navigate('ChallengePage');
        } 
        }
      />
      <Text style={{ marginTop: 10 }}>{this.state.response}</Text>
    </View>
    );
  }
}

 

const mapStateToProps = state => {
    return{
      ctr: state.counter,
      crv: state.piyixia
    }
}

const mapDispatchToProps = dispatch => {

    return {
      incCounter: () =>{
        dispatch({type: 'act'});
      },
      decCounter: () => {

        dispatch({type:'decrease',payload:10});
      }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);
