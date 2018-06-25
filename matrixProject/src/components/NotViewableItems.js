/*
Components include
users' icon, Comment Button, Share Button and Muted Button
display in the video page
*/
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Button } from 'react-native';
import { UserCircle, Comment, Share, Music, Wechat, Weibo } from './icons';
import CommentModal from './CommentModal';

class Features extends Component {
  constructor(props) {
    super(props);
    this.commentModal = this.commentModal.bind(this);
    this.shareModal = this.shareModal.bind(this);
    this.muteVideo = this.muteVideo.bind(this);

    state={
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
 });
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
    console.log(this.state.videoMuted);
  }

  render() {
  return (
    <View>
      {/*USER'S ICON*/}
      <View style={[styles.overlay, { top: 30, left: 20 }]}>
        <UserCircle />
      </View>
      {/*COMMENT SHARE MUTE*/}
      <View style={[styles.overlay, { top: 400, left: 320 }]}>
      <View style={{ alignItems: 'center' }}>
        <View><Comment /></View>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>2392k</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <View><Share /></View>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>623</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <View>
        <Music off={this.state.videoMuted} />
      </View>
      </View>
      </View>

      {/* Comment Modal*/}
      <CommentModal display={this.state.commentModal} />
      {/* Share Modal */}
      {this.state.shareModal && <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.shareModal}
      >
        <View style={styles.modalContainer}>
          <Text style={{ fontSize: 20, margin: 10 }}>
            Share to
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Wechat />
            <Weibo />
          </View>
          <Button
            style={{ margin: 10 }}
            onPress={this.shareModal.bind(this)}
            title="Close"
          />
        </View>
      </Modal> }
    </View>
);
}
}

const styles = {
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modalContainer: {
    marginTop: 500,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
};

export default Features;
