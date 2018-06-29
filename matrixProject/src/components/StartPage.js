import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class StartPage extends Component {
  constructor(props) {
    super(props);
    this.onPressInStartButton = this.onPressInStartButton.bind(this);
    this.onPressInScoreButton = this.onPressInScoreButton.bind(this);
  }
  onPressInStartButton() {
    this.props.navigation.navigate('questionpage');
  }
  onPressInScoreButton() {
    this.props.navigation.navigate('scoreboard');
  }

  render() {
    console.log('renderStartPage');
    return (
      <View style={styles.containerStyle}>
        <View style={styles.rulesStyle}>
          <Text style={styles.rulesTextStyle}>
            The Rules
          </Text>
        </View>

      <View style={styles.containerStyle2}>
        <TouchableOpacity
          onPressIn={this.onPressInStartButton}
          style={styles.buttonStyle}
        >
        <Text style={styles.buttonTextStyle}>
          Start
        </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.trophyStyle}
        onPressIn={this.onPressInScoreButton}
      >
        <Icon name='ios-trophy-outline' type='Ionicons' size={50} color='green' />
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = {
  rulesStyle: {
    flex: 2.75,
    paddingTop: 100,
    alignItems: 'center'
  },
  rulesTextStyle: {
    fontSize: 18
  },
  buttonStyle: {
    width: 145,
    height: 50,
    borderRadius: 20,
    backgroundColor: '#DDDDDD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTextStyle: {
    fontSize: 27
  },
  trophyStyle: {
    bottom: 50,
    right: 40,
    position: 'absolute'
  },
  containerStyle: {
    backgroundColor: 'white',
    flex: 4,
    flexDirection: 'column'
  },
  containerStyle2: {
    flex: 1.25,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default StartPage;
