/*MODULE 1*/
import React, { Component } from 'react';
import {
  View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback,
  Button, ScrollView, ListView, Image, TextInput, KeyboardAvoidingView,
  Keyboard, FlatList
 } from 'react-native';
import Video from 'react-native-video';
import { UserCircle, Comment, Share, Music, Pen, Wechat, Weibo, Play, Cross, Send } from './icons';
import comment from './comment.json';
import V1 from './video.mp4';

class VideoPage extends Component {
  state={
    videoList: '',
    shareModal: false,
    commentModal: false,
    commentInput: false,
    mask: false,
    videoPaused: false,
    videoMuted: false,
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    comment: '',
    keyboardHeight: 0,
    yourComment: 'comment',
    draftComment: '',
    scrollY: 0
  };
  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
    this.setState({
      videoList: V1,
      dataSource: this.state.dataSource.cloneWithRows(comment.data),
      comment: comment.data[5].comment,
      scrollY: 0,
      videoPaused: false,
      videoMuted: false,
      shareModal: false,
      commentModal: false,
      commentInput: false,
      mask: false,
      keyboardHeight: 0,
      yourComment: 'comment',
      draftComment: '',
 });
  }
  componentDidMount() {

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
    if (this.state.comment.length > 80) {
    this.myInterval = setInterval(() => {
      this.scrolling();
    }, 100);
  }
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
      this.keyboardWillHideSub.remove();
    clearInterval(this.myInterval);
    this.pauseVideoOnChangingTab.remove();
    this.continueVideoOnChangingTab.remove();
  }

  keyboardWillShow = () => {
    this.setState({ keyboardHeight: 257 });
}
  keyboardWillHide = () => {
    this.setState({ keyboardHeight: 0 });
}
  scrolling() {
    this.myScroll.scrollTo({ y: this.state.scrollY + 1, animated: true });
  }
  reachScrollEnd({ contentOffset, contentSize }) {
    if (contentOffset.y >= contentSize.height) {
      this.setState({ scrollY: -10 });
    } else {
      this.setState({ scrollY: this.state.scrollY + 1 });
    }
  }
  shareModal() {
    this.setState({ shareModal: !this.state.shareModal });
  }
  commentModal() {
    this.setState({ videoPaused: true, commentModal: !this.state.commentModal });
  }
  pauseVideo() {
    this.setState({ videoPaused: !this.state.videoPaused });
  }
  hidePlayIcon() {
    if (this.state.videoPaused) {
      return (
        <View
        style={[styles.overlay,
          { top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }]}
        >
          <Play />
        </View>
      );
    }
  }
  muteVideo() {
    this.setState({ videoMuted: !this.state.videoMuted });
  }

  textInputbox = () => {
    if (this.state.commentInput) {
      return (
        <View style={{ height: 145, backgroundColor: '#ededed', bottom: this.state.keyboardHeight }}>
          <View style={{ borderColor: 'black', borderWidth: 0.5, marginBottom: 2, marginTop: 17, marginHorizontal: 17, height: 80 ,backgroundColor: 'white' }}>
          <TextInput
            style={{ color: 'grey', paddingLeft: 10, paddingTop: 8, fontWeight: '800', fontSize: 19 }}
            placeholder='| comment'
            defaultValue={this.state.draftComment}
            placeholderTextColor='grey'
            returnKeyType='done'
            onChangeText={(yourComment) => {
              this.setState({ yourComment: yourComment, draftComment: yourComment })}}
          />
        </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <Button title='发送' color='green' />
          </View>
        </View>
      );
    }
  }

  fun() {
    this.setState({ mask: !this.state.mask });
    this.setState({ commentInput: !this.state.commentInput });
  }

  mask= () => {
    if (this.state.mask) {
      return (
        <TouchableWithoutFeedback onPressIn={() => { this.fun(); }}>
            <View style={{ position: 'absolute', flex: 1, bottom: 0, right: 0, top:0, left: 0, backgroundColor: 'rgba(0,0,0,0.8)' }} />
          </TouchableWithoutFeedback>
      );
    }
  }

  renderItem = (item, index) => {
    return (
      <View style={styles.rowsContainerStyle}>
        <View style={[styles.imageBorderStyle, { width: 40, height: 40, borderRadius: 30 }]}>
          <Image
            source={{ uri: item.icon }}
            style={{ width: 30, height: 30 }}
          />
        </View>

        <View style={{ flexDirection: 'column', paddingHorizontal: 15, marginRight: 30 }}>
          <Text style={{ fontSize: 15, color: '#383838' }}>
            {item.name}
          </Text>
          <Text>{item.comment}</Text>
        </View>
        <View style={{ position: 'absolute', right: 5, top: 10 }}><Text style={{ color: '#707070' }}>{item.time}</Text></View>
      </View>
    );
  }
  videos = () => {
          return (
              <Video
                source={V1}
                style={{height: 50, width:50}}
                resizeMode="cover"
                paused={this.state.videoPaused}
                muted={this.state.videoMuted}
                repeat={true}
              />
            );
  }
  render() {
    // const videos = Object.keys(VideoList).map(key => {
    //   return (
    //     <ScrollView>
    //     <Video
    //       source={VideoList[key]}
    //       style={styles.fullScreen}
    //       resizeMode="cover"
    //       paused={this.state.videoPaused}
    //       muted={this.state.videoMuted}
    //       repeat={true}
    //     />
    //     </ScrollView>
    //   );
    // });

    return (
      <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ flex: 1 }} onPressIn={this.pauseVideo.bind(this)}>
        {this.videos()}
        {this.hidePlayIcon()}
      </TouchableOpacity>

      <View style={[styles.overlay, { top: '7%', left: '7%' }]}>
        <UserCircle />
      </View>
      <View style={[styles.overlay, { top: '55%', right: '4%' }]}>
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity onPressIn={this.commentModal.bind(this)}><Comment /></TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>2392k</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <TouchableOpacity onPressIn={this.shareModal.bind(this)}><Share /></TouchableOpacity>
        <Text style={{ color: 'white', fontSize: 12, fontWeight: '500' }}>623</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <TouchableOpacity onPressIn={this.muteVideo.bind(this)}>
        <Music off={this.state.videoMuted} />
        </TouchableOpacity>
      </View>
      </View>

      <TouchableOpacity style={[styles.overlay, { bottom: '15%', left: '4%' }]}>
        <Text style={styles.textStyle}>
          # Eat
        </Text>
      </TouchableOpacity>
      <View style={[styles.overlay, { height: '6%', bottom: '7%', marginHorizontal: '3%' }]}>
        <ScrollView
          ref={(ref) => this.myScroll = ref}
          onScroll={({ nativeEvent }) => { this.reachScrollEnd(nativeEvent); }}
          scrollEventThrottle={400}
        >
        <Text style={[styles.textStyle]}>
          {this.state.comment}
        </Text>
      </ScrollView>
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'white' }} />
      </View>
        <TouchableOpacity
          style={[styles.overlay, { flexDirection: 'row', bottom: '2%', left: '3%' }]}
          onPressIn={this.fun.bind(this)}
        >
        <Pen color='white' />
        <Text style={{ color: 'white', paddingLeft: '1%', fontWeight: '800' }}>{this.state.yourComment === '' ? 'comment' : this.state.yourComment}</Text>
      </TouchableOpacity>
          {this.mask()}
          {this.textInputbox()}

      <Modal
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
          <Button style={{ margin: 10 }} title='Cancel' onPressIn={this.shareModal.bind(this)} />
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.commentModal}
      >
      <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255, 0.9)' }}>
        <TouchableOpacity
          style={{ position: 'absolute', top: 20, right: 5 }}
          onPressIn={this.commentModal.bind(this)}
        >
          <Cross />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', margin: 8, paddingTop: 20 }}>
        <Text style={{ fontSize: 20, color: '#707070' }}>Comment (1.2k)</Text>
        </View>
        <View style={{ borderBottomWidth: 2, borderBottomColor: '#707070', marginHorizontal: 10 }} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data, someShit, i) => this.renderItem(data, i)}
          enableEmptySections
        />
      </View>
      <KeyboardAvoidingView behavior="padding" enabled>
      <View style={{ flexDirection: 'row', height: 50, backgroundColor: '#efefef', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 10, paddingRight: 20 }}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
        <Pen color='black' />
        <TextInput
          style={{ color: 'black', paddingLeft: 15, fontWeight: '800' }}
          placeholder='comment'
          placeholderTextColor='black'
          returnKeyType='done'
          defaultValue={this.state.draftComment}
          onChangeText={(yourComment) => {
            this.setState({ yourComment: yourComment, draftComment: yourComment })}}
        />
        </View>
        <View><Send /></View>
      </View>
      </KeyboardAvoidingView>
      </Modal>
    </View>
    );
  }
}

const styles = {
  fullScreen: {
  flex: 1,
},
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
  modalContainer: {
    marginTop: 500,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rowsContainerStyle: {
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 0.8,
    borderColor: '#707070'
  },
  imageBorderStyle: {
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};

export default VideoPage;
