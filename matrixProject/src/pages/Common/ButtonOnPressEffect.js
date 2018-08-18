import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';

class ButtonOnPressEffect extends Component {
    state = { pressStatus: this.props.status };

    onShowUnderlay() {
      this.props.fuc(!this.state.pressStatus);
      this.setState({ pressStatus: !this.props.status }); 
    }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.onShowUnderlay()}
          style={this.state.pressStatus ? styles.buttonPress : styles.button}
        >
          <Text style={this.state.pressStatus ? styles.textPress : styles.textStyle}>
            {this.props.text}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = {
  container: {

  },
  button: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5
  },
  buttonPress: {
    width: 200,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5
  },
  textPress: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
};

export { ButtonOnPressEffect };
