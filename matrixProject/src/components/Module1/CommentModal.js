/*
Comment List
*/
import React, { Component } from 'react';
import {
  View, Text, Modal, ListView, Image, TextInput, KeyboardAvoidingView, TouchableOpacity
 } from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { Send, Pen } from '../icons';


class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentModal: this.props.display,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      commentInput: false,
      videoPaused: false,
      videoMuted: false,
      comment: '',
      yourComment: 'comment',
      draftComment: '',
    };
  }

  componentWillMount() {
      this.setState({
      videoPaused: false,
      commentInput: false,
      yourComment: 'comment',
      draftComment: '',
 });
  }
  // Pass onpress event from parent Feature.js
  componentWillReceiveProps(nextProps) {
    if (this.props.display !== nextProps.display) {
      // GET ALL COMMENT 获取所有评论
      fetch('http://172.17.87.251:3000/get/comment/' + nextProps.vid, {
        credentials: 'same-origin',
      })
        .then((response) => (response.json()))
        .catch((error) => {
          console.log(error);
        })
        .then((res) => {
            this.setState({
              comment: res.content,
              dataSource: this.state.dataSource.cloneWithRows(res)
            });
      });
      //显示评论框
    this.setState({
      commentModal: true
    });
  }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }
    return false;
  }

// Swipe down to close modal
  onSwipeDown() {
  this.setState({ commentModal: false });
}

//send comment 发表评论
  send() {
    fetch('http://172.17.87.251:3000/add/comment/' + this.props.vid, {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'comment': this.state.yourComment })
      }).then((response) => response.text())
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        console.log(res);
  });
  }


// Render user comment list
  renderItem = (item) => {
    return (
      <View style={styles.rowsContainerStyle}>

        {/* <View style={[styles.imageBorderStyle, { width: 40, height: 40, borderRadius: 30 }]}>
          <Image
            source={{ uri: item.icon }}
            style={{ width: 30, height: 30 }}
          />
        </View> */}

        <View style={{ flexDirection: 'column', paddingHorizontal: 15, marginRight: 30 }}>
          <Text style={{ fontSize: 15, color: '#383838' }}>
            {item.author}
          </Text>
          <Text>{item.content}</Text>
        </View>

        <View style={{ position: 'absolute', right: 5, top: 10 }}>

        <Text style={{ color: '#707070' }}>{item.date}</Text>
        </View>
      </View>
    );
  }

  render() {
    console.log('renderCommentModal');
    return (
      <GestureRecognizer
        onSwipeDown={(state) => this.onSwipeDown(state)}
        config={{ velocityThreshold: 0.3 }}
      >
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.commentModal}
      >

      <View style={{ flex: 1, top:'30%', paddingBottom:'30%', borderRadius:12 ,backgroundColor: 'rgba(255,255,255, 0.9)' }}>
        {/*Close modal button*/}
        {/* <View style={{ position: 'absolute', top: 10, right: 2 }}>
          <TouchableOpacity onPressIn={this.closeModal}>
            <View style={{position: 'absolute', top: 16, right: 2, height: 45, width: 45, backgroundColor: 'rgba(0,0,0,0)'}}><Cross /></View>
          </TouchableOpacity>
          </View> */}

        <View style={{ alignItems: 'center', margin: 8, paddingTop: 20 }}>
        <Text style={{ fontSize: 20, color: '#707070' }}>Comment (1.2k)</Text>
        </View>
        <View
          style={{ borderBottomWidth: 2, borderBottomColor: '#707070', marginHorizontal: 10 }}
        />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data, someShit, i) => this.renderItem(data, i)}
          enableEmptySections
        />
      </View>
      {/*COMMENT BAR*/}
      <KeyboardAvoidingView behavior="padding" enabled>
      <View style={styles.commentBarContainer}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
        <Pen color='black' />
        <TextInput
          style={{ color: 'black', paddingLeft: 15, fontWeight: '800' }}
          placeholder='comment'
          placeholderTextColor='black'
          returnKeyType='done'
          defaultValue={this.state.draftComment}
          onChangeText={(yourComment) => {
            this.setState({ yourComment: yourComment, draftComment: yourComment });
          }}
        />
        </View>

        <TouchableOpacity onPress={this.send.bind(this)}><Send /></TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
      </Modal>
      </GestureRecognizer>
    );
}
}

const styles = {
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
  },
  commentBarContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 20
  }
};

export default CommentModal;
