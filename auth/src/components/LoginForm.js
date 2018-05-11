import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Buttons, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true }); //clear the old error message
                                            // the spinner shows once pressing button

    firebase.auth().signInWithEmailAndPassword(email, password) //retrun a promise
      .then(this.onLoginSuccess.bind(this)) // if success
      .catch(() => {  //if failed
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
}

/*
helper function for SUCCESS login
1. dont show error message
2. dont show loading spinner
3. dont show email and password in the form anymore.
*/
onLoginSuccess() {
  this.setState({
    error: '',
    loading: '',
    email: '',
    password: ''
  });
}
/*
helper function for FAIL login
1. show error message
2. dont show loading spinner
*/
onLoginFail() {
  this.setState({ error: 'Authentication Failed.', loading: '' });
}

//decide display button or spinner
renderButton() {
  if (this.state.loading) {
    return <Spinner size="small" />;
  }

  return (
    <Buttons onPress={this.onButtonPress.bind(this)}>
     Log in
    </Buttons>
  );
}

render() {
  return (
     <Card>
      <CardSection>
        <Input
          placeholder="user@gmai.com"
          label="Email"
          value={this.state.email}
          onChangeText={email => this.setState({ email })} //function get called whenever user input
            //whenever called setState, compnents rerendered immediatelly
        />
      </CardSection>

      <CardSection>
        <Input
          secureTextEntry //it means true
          placeholder="password"
          label="Password"
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
      </CardSection>

      <Text style={style.errorTextStyle}>
        {this.state.error}
      </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const style = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
