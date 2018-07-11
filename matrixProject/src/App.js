import React, { Component } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import HomePage from './components/HomePage';
import Router2 from './Router2';
import LoginPage from './LoginPage';

class App extends Component {
    state = { screen: '' };
  render() {
    return (
     <Router2 />
    );
  }
}

export default App;
