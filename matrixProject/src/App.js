import React, { Component } from 'react';
import Router from './Router';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import  localReducers from './reducers/localReducers';
let store = createStore(localReducers);
class App extends Component {
  //  state = { screen: '' };

  render() {
    return (
      <Provider store={store}>

         <Router />

     </Provider>
    );
  }
}

export default App;
