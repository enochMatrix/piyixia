/*
Component includes the
Video Tag, video description and comment bar
in the video page
*/
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Keyboard, TextInput, Button
} from 'react-native';
import { Pen } from '../icons';
import ScrollComment from './ScrollComment';

class FeatureB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: props.input,
      mask: false,
      keyboardHeight: 0,
      yourComment: 'comment',
      draftComment: ''
      };
  }
  componentWillMount() {
    //Keyboard listner to adjust comment bar height when input
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.setState({
      commentInput: false,
      mask: false,
      keyboardHeight: 0,
      yourComment: 'comment',
      draftComment: '',
 });
  }

  // press anywhere outside the input box to close it
  componentWillReceiveProps() {
    this.setState({
      commentInput: this.props.input
    });
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  //Move the textInputbox up when keyboard shows
  keyboardWillShow = (e) => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
}
  keyboardWillHide = () => {
    this.setState({ keyboardHeight: 0 });
}

  // Pop up text input box when pressing comment bar
  textInputbox() {
    if (this.state.commentInput) {
      return (
        <View>
        <View style={[styles.inputBoxContainer, { bottom: this.state.keyboardHeight }]}>

          <View style={styles.inputBoxBorder}>
          <TextInput
            style={styles.inputBoxText}
            placeholder='| comment'
            defaultValue={this.state.draftComment}
            placeholderTextColor='grey'
            returnKeyType='done'
            onChangeText={(yourComment) => {
              this.setState({ yourComment: yourComment, draftComment: yourComment });
            }}
          />
        </View>

          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Button title='发送' color='green' />
          </View>

        </View>
        </View>
      );
    }
  }

  render() {
  return (
    <View style={{ flex: 1 }}>
      {/*VIDEO'S TAG*/}
      <TouchableOpacity style={[styles.overlay, { bottom: 100, left: 15 }]}>
        <Text style={styles.textStyle}>
          # Eat
        </Text>
      </TouchableOpacity>

      <ScrollComment description={this.props.description} />

      {/*USER COMMENT AREA*/}
      <TouchableOpacity
          style={[styles.overlay, { flexDirection: 'row', bottom: 15, left: '3%' }]}
          onPressIn={() => {
            this.setState({ mask: !this.state.mask, commentInput: true });
          }}
      >
        <Pen color='white' />
        <Text style={{ color: 'white', paddingLeft: '5%', fontWeight: '800' }}>
          {this.state.yourComment === '' ? 'comment' : this.state.yourComment}
        </Text>
      </TouchableOpacity>
      {this.textInputbox()}
    </View>
);
}
}

const styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  textStyle: {
    color: 'white',
    fontWeight: '800',
    justifyContent: 'center',
    fontSize: 16
  },
  inputBoxContainer: {
     position: 'absolute',
     height: 145,
     left: 0,
     right: 0,
     backgroundColor: '#ededed'
  },
  inputBoxBorder: {
     borderColor: 'black',
     borderWidth: 0.5,
     marginBottom: 2,
     marginTop: 17,
     marginHorizontal: 17,
     height: 80,
     backgroundColor: 'white'
  },
  inputBoxText: {
     color: 'grey',
     paddingLeft: 10,
     paddingTop: 8,
     fontWeight: '800',
     fontSize: 19
  }
};

export default FeatureB;
