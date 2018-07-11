/*
Component includes the
Video Tag, video description and comment bar
in the video page
*/
import React, { Component } from 'react';
import {
  View, Text, ScrollView
} from 'react-native';

class ScrollComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description,
      scrollY: 0
      };
  }
  componentWillMount() {
    //Keyboard listner to adjust comment bar height when input
    this.setState({
      scrollY: 0,
 });
  }
  componentDidMount() {
    /* If video description excess two lines, auto scroll it
        Set Time interval 100 and scroll position in scrolling function */
    if (this.state.description.length > 75) {
    this.myInterval = setInterval(() => {
      this.scrolling();
    }, 100);
  }
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
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

  render() {
  return (
      <View style={[styles.overlay, { height: 40, bottom: 50, marginHorizontal: 10 }]}>
        <ScrollView
          ref={(ref) => this.myScroll = ref}
          onScroll={({ nativeEvent }) => { this.reachScrollEnd(nativeEvent); }}
          scrollEventThrottle={400}
        >
        <Text style={[styles.textStyle]}>
          {this.state.description}
        </Text>
      </ScrollView>
      <View style={{ borderBottomWidth: 1.5, borderBottomColor: 'white', width: 350 }} />{/*A LINE*/}
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
  }
};

export default ScrollComment;
