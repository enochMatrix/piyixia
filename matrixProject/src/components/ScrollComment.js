/*
Component includes the
Video Tag, video description and comment bar
in the video page
*/
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, Keyboard, TextInput, Button
} from 'react-native';
import { Pen } from './icons';
import comment from './comment.json';

class ScrollComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentInput: props.input,
      videoList: '',
      mask: false,
      videoPaused: false,
      comment: '',
      keyboardHeight: 0,
      yourComment: 'comment',
      draftComment: '',
      scrollY: 0
      };
  }
  componentWillMount() {
    //Keyboard listner to adjust comment bar height when input
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.setState({
      comment: comment.data[5].comment,
      scrollY: 0,
      videoPaused: false,
      commentInput: false,
      mask: false,
      keyboardHeight: 0,
      yourComment: 'comment',
      draftComment: '',
 });
  }
  componentDidMount() {
    /* If video description excess two lines, auto scroll it
        Set Time interval 100 and scroll position in scrolling function */
    if (this.state.comment.length > 80) {
    this.myInterval = setInterval(() => {
      this.scrolling();
    }, 100);
  }
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
    clearInterval(this.myInterval);
  }

  //Move the textInputbox up when keyboard shows
  keyboardWillShow = (e) => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
}
  keyboardWillHide = () => {
    this.setState({ keyboardHeight: 0 });
}

  // Auto scrolling function
  scrolling() {
    this.myScroll.scrollTo({ y: this.state.scrollY + 1, animated: true });
  }
  // If scrolles to end, back to the begining
  reachScrollEnd({ contentOffset, contentSize }) {
    if (contentOffset.y >= contentSize.height) {
      this.setState({ scrollY: -10 });
    } else {
      this.setState({ scrollY: this.state.scrollY + 1 });
    }
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
      <TouchableOpacity style={[styles.overlay, { bottom: 80, left: 15 }]}>
        <Text style={styles.textStyle}>
          # Eat
        </Text>
      </TouchableOpacity>

      {/*AUTO SCROLL VIDEO DESCRIPTION */}
      <View style={[styles.overlay, { height: 40, bottom: 35, marginHorizontal: '3%' }]}>
        <ScrollView
          ref={(ref) => this.myScroll = ref}
          onScroll={({ nativeEvent }) => { this.reachScrollEnd(nativeEvent); }}
          scrollEventThrottle={400}
        >
        <Text style={[styles.textStyle]}>
          {this.state.comment}
        </Text>
      </ScrollView>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }} />{/*A LINE*/}
      </View>

      {/*USER COMMENT AREA*/}
      <TouchableOpacity
          style={[styles.overlay, { flexDirection: 'row', bottom: 10, left: '3%' }]}
          onPressIn={() => {
            this.setState({ mask: !this.state.mask, commentInput: true });
          }}
      >
        <Pen color='white' />
        <Text style={{ color: 'white', paddingLeft: '1%', fontWeight: '800' }}>
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

export default ScrollComment;
