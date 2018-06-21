/*MODULE 1*/
import React, { Component } from 'react';
import {
  View, TouchableOpacity, ListView, FlatList, Dimensions, TouchableWithoutFeedback
 } from 'react-native';
import Video from 'react-native-video';
import { Play } from './icons';
import Features from './Features';
import ScrollComment from './ScrollComment';

const VIDEOS = [
   'https://s3.amazonaws.com/bostondelhi/onboarding_screen.mp4',
   'https://s3.amazonaws.com/bostondelhi/V2_edited.mp4',
   'https://s3.amazonaws.com/bostondelhi/V3_edited.mp4',
   'https://s3.amazonaws.com/bostondelhi/V4_edited.mp4'
];

class HomePage extends Component {
  constructor() {
    super();
    this.handleViewableItemsChanged = this.handleViewableItemsChanged.bind(this);
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
  }
  state={
    videoList: '',
    commentInput: false,
    mask: false,
    videoPaused: false,
    videoMuted: false,
    comment: '',
    yourComment: 'comment',
    draftComment: '',
    page: 0
  };
  componentWillMount() {
      this.setState({
      videoList: VIDEOS,
      videoPaused: false,
      commentInput: false,
      mask: false,
      yourComment: 'comment',
      draftComment: ''
 });
  }
  componentDidMount() {
    //Pause video when changing to other tabs
    this.pauseVideoOnChangingTab = this.props.navigation.addListener('didFocus', () => {
    this.setState({
      videoPaused: false
    });
 });
   this.continueVideoOnChangingTab = this.props.navigation.addListener('didBlur', () => {
   this.setState({
     videoPaused: true
    });
  });
  }
  componentWillUnmount() {
    this.pauseVideoOnChangingTab.remove();
    this.continueVideoOnChangingTab.remove();
  }

  /* TO get the current (viewable) video index in the flastlist */
  handleViewableItemsChanged(info) {
    this.setState({ page: info.viewableItems[0].index });
   }

renderItem = ({ item, index }) => {
  const { videoPaused, videoMuted, mask, commentInput } = this.state;
  // render everything for the current video
  if (index === this.state.page) {
  return (
    <View>
    <TouchableOpacity
      style={{ flex: 1 }} onPress={() => { this.setState({ videoPaused: !videoPaused }); }}
    >
      <Video
        source={{ uri: item }}
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        resizeMode="cover"
        paused={videoPaused}
        muted={videoMuted}
        repeat
      />
      {/*Video play logo*/}
      {videoPaused && <View
      style={[styles.overlay,
        { top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }]}
      >
        <Play />
      </View>}
    </TouchableOpacity>
    {/* Features component includes all the features in the video page */}
    <View style={[styles.overlay, { flex: 1 }]}>
    <Features />
    </View>
    {mask &&  // Mask is when comment box open, darken the background
      <TouchableWithoutFeedback
        onPressIn={() => {
          this.setState({ mask: !this.state.mask, commentInput: false });
    }}>
      <View style={styles.maskStyle} />
      </TouchableWithoutFeedback>
    }
    <View>
      {/* input is a boolean prop to open/close comment modal */}
    <ScrollComment input={commentInput} />
    </View>
    </View>
  );
}
/* just render the video itself but not playing it
  for not viewable videos */
return (
  <View>
    <Video
      source={{ uri: item }}
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
      }}
      resizeMode="cover"
      paused
      muted
    />
  <View style={[styles.overlay, { flex: 1 }]}>
  <Features />
  </View>
  <View>
  <ScrollComment input={this.state.commentInput} />
  </View>
  </View>
);
}
  render() {
    return (
      <View style={{ flex: 1 }}>
      <FlatList
        pagingEnabled
        data={this.state.videoList}
        renderItem={this.renderItem}
        extraData={this.state}
        onViewableItemsChanged={this.handleViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        initialNumberToRender={3}
      />
    </View>
    );
  }
}

const styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  maskStyle: {
     position: 'absolute',
     flex: 1,
     bottom: 0,
     right: 0,
     top: 0,
     left: 0,
     backgroundColor: 'rgba(0,0,0,0.8)'
  }
};

export default HomePage;
