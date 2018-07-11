/*
Components include
users' icon, Comment Button, Share Button and Muted Button
display in the video page
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Comment, Share, Music } from '../icons';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

const window = Dimensions.get('window');

class Features extends Component {
  constructor(props) {
    super(props);
    this.commentModal = this.commentModal.bind(this);
    this.shareModal = this.shareModal.bind(this);
    this.muteVideo = this.muteVideo.bind(this);

    this.state = {
      shareModal: false,
      commentModal: false,
      videoPaused: false,
      videoMuted: false,
  };
}
  componentWillMount() {
      this.setState({
      videoPaused: false,
      commentModal: false,
      shareModal: false,
 });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state === nextState) {
      return false;
    }
    return true;
  }

  //To open or close comment modal, should pause video when open it
  commentModal() {
    this.setState({ commentModal: !this.state.commentModal });
  }

  //To open or close share modal
  shareModal() {
    this.setState({ shareModal: !this.state.shareModal });
  }

  //To mute or unmute video; Button log changed when pressing it
  muteVideo(data) {
    this.setState({ videoMuted: !this.state.videoMuted });
    this.props.update(data);
  }

  render() {
    console.log('renderFeatures');
    const { commentModal } = this.state;
  return (
    <View>
      {/*COMMENT SHARE MUTE*/}
      <View style={[styles.overlay, { top: 370, left: 320 }]}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPressIn={this.commentModal}><Comment /></TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>2392k</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPressIn={this.shareModal}><Share /></TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>623</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPressIn={()=>{this.muteVideo({ videoMuted: !this.state.videoMuted })}}>
        <Music off={this.state.videoMuted} />
        </TouchableOpacity>
      </View>
      </View>

      {/* Comment Modal*/}
      <CommentModal display={commentModal} />
      {/* Share Modal */}
      <ShareModal display={this.state.shareModal} />

      {commentModal &&
      <TouchableWithoutFeedback>
        <View style={styles.backgroundOpacity} />
      </TouchableWithoutFeedback>
      }
    </View>
);
}
}

const styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  backgroundOpacity: {
    position: 'absolute',
    width: window.width,
    height: window.height,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
};

export default Features;
