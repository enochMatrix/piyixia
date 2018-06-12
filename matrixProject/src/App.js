import React, { Component } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
 import HomePage from './components/HomePage';
import Router from './Router';
import Router2 from './Router2';

class App extends Component {
    state = { screen: '' };
  try() {
    if (this.state.screen === 'a') {
      return (
        <Router />
      );
    }
    return (
      <HomePage />
    );
  }
  render() {
    return (
     //  <GestureRecognizer
     //    onSwipeLeft={() => this.setState({ screen: 'a' })}
     //    onSwipeRight={() => this.setState({ screen: 'b' })}
     //    style={{
     //      flex: 1
     //    }}
     //  >
     //    {this.try()}
     // </GestureRecognizer>
     <Router2 />
    );
  }
}

export default App;
