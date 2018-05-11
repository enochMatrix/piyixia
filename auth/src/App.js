/*
Centralize all the code for application inside App.js
benifit: no platform limitation
*/
import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';

//just one line importing all components
import { Header, Buttons, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedin: null }; //cannot be 'false here', it will LOG OUT render initially

  componentWillMount() {
    firebase.initializeApp({
       apiKey: 'AIzaSyCvSmcQUVYLsTjLkDA8pZVFT9Y4nNnR1CM',
       authDomain: 'auth-65349.firebaseapp.com',
       databaseURL: 'https://auth-65349.firebaseio.com',
       projectId: 'auth-65349',
       storageBucket: 'auth-65349.appspot.com',
       messagingSenderId: '661090074399'
    });

    /*
    event handler for either sign in or sign out
    it canbe called at anytime inside our application
    */
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedin: true });
      } else {
        this.setState({ loggedin: false });
      }
    });
  }

  //helper function decides shows LoginForm or SignOut Button
  renderContent() {
    switch (this.state.loggedin) {
      case true: return ( //the instance we sign out, our state changes.
        <Buttons onPress={() => firebase.auth().signOut()}>
          Log Out
        </Buttons>
      );
      case false: return <LoginForm />;
      default: return <Spinner size="large" />;

    }
  }

  render() {
    return (
        <View>
          <Header headerText='Authentication' />
          {this.renderContent()}
        </View>
    );
  }
}

export default App;
