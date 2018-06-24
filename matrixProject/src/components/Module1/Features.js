/*
Components include
users' icon, Comment Button, Share Button and Muted Button
display in the video page
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { UserCircle, Comment, Share, Music, Wechat, Weibo } from '../icons';
import CommentModal from './CommentModal';
import ShareModal from './ShareModal';

class Features extends Component {
  constructor(props) {
    super(props);
    this.commentModal = this.commentModal.bind(this);
    this.shareModal = this.shareModal.bind(this);
    this.muteVideo = this.muteVideo.bind(this);

    this.state={
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

  shouldComponentUpdate ( nextProps,nextState ){
    if(this.state === nextState) {
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
  return (
    <View>
      {/*USER'S ICON*/}
      <View style={[styles.overlay, { top: 30, left: 20 }]}>
        <UserCircle />
      </View>
      {/*COMMENT SHARE MUTE*/}
      <View style={[styles.overlay, { top: 400, left: 320 }]}>
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
      <CommentModal display={this.state.commentModal} />
      {/* Share Modal */}
      <ShareModal display={this.state.shareModal} />
    </View>
);
}
}

const styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  }
};

export default Features;
