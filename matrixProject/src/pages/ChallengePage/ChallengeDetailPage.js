//挑战内容页面

import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import ChallengeContent from './components/ChallengeContent';
import Sponsor from './components/Sponsor';
import Accepted from './components/Accepted';
import CommentPage from './components/commentPage';
import YesOrNo from './components/YesOrNo';
import SponsModal from './components/SponsModal';
import CommentModal from '../Common/Comment/CreateComment';

class ChallengeDetailPage extends Component {

  // set state and list view data
  state = {
    commentModalVisible: false,
    sponsModalVisible: false,
    status: 0,
    showComent: false,
    sponsored: false
  };
  
  constructor(props) {
    super(props);
    console.log("2");
    this.comment = this.comment.bind(this);
    this.spons = this.spons.bind(this);
    this.handler = this.handler.bind(this);
  }

  handler = (e) => {

    this.setState({ showComent: true});
    this.setState({ commentModalVisible: false });
   
  }

  comment() {
    this.setState({ commentModalVisible: true });
  }

  spons() {
    this.setState({ commentModalVisible: false });
    this.setState({ sponsModalVisible: true });
   
  }

  confirmSpons = (number) => {
    Alert.alert(
      '已赞助：', number.toString(),
      [
        { text: 'OK', onPress: this.spons },
      ],
      { cancelable: false }
    );
  }

  share() {
    console.log('share!');
  }

  render() {

    const {
      title, description, author, currentTime, url, id
    } = this.props.navigation.state.params;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={[styles.cardStyle, { flexDirection: 'column' }]}>
            {/*挑战内容*/}
            <ChallengeContent
              title={title}
              description={description}
              author={author}
              currentTime={currentTime}
              url={url}
            />
            {/*一条分割线*/}
            <View style={styles.line} />
            {/*金主榜*/}
            <Sponsor spons={this.state.sponsored}/>
          </View>

          {/*如果已接受，大司马的回复，表情，视频链接*/}
          <View style={[styles.cardStyle, { flexDirection: 'row' }]}>
            {
              <Accepted props={this.props} />
            }

          </View>
          {/*评论内容*/}
          <View style={[styles.cardStyle, { flexDirection: 'column', marginBottom: 80 }]}>
            { 
            
              <CommentPage  />
            }
          </View>
        </ScrollView>

        {/*底部 3tabs： 转发 评论 赞助*/}
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.textStyle}>转发</Text>
          </View>
          <View style={styles.verticalLine} />

          <TouchableOpacity
            onPress={this.comment}
            style={styles.tabStyle}
          >
            <Image
              source={require('../Logo/comment.png')}
              style={{ width: 20, height: 20 }}
            />
            <Text style={styles.textStyle}>评论</Text>
          </TouchableOpacity>
          <View style={styles.verticalLine} />

          <TouchableOpacity
            onPress={this.spons}
            style={styles.tabStyle}
          >
            <Image
              source={require('../Logo/sponsor.png')}
              style={{ width: 33, height: 33 }}
            />
            <Text style={styles.textStyle}>赞助</Text>
          </TouchableOpacity>

          <View style={styles.bottomBarWrapper} />
        </View>

        {/*点击评论，如果未赞助，提示赞助 modal  */}
        {
          this.state.commentModalVisible &&

          <CommentModal
            handler={this.handler}
          />
        }

        {/* 点击赞助 输入赞助金额， 如果不够， 输入充值金额 */}
        
        <SponsModal
          
          onPressOk={() => {  
            this.setState({ sponsModalVisible: false }); 
            this.setState({ sponsored:true});
          }}
          
          onPressCancel={() => {  
            this.setState({ sponsModalVisible: false }); 
          }}
          
          visible={this.state.sponsModalVisible}
          cid={id}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#bababa'
  },
  textStyle: {
    paddingLeft: '2%',
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    //lineHeight: 18,
    fontFamily: 'Georgia'
  },
  line: {
    backgroundColor: '#cccccc',
    height: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  },
  verticalLine: {
    backgroundColor: 'white',
    width: 0.4,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 5,
  },
  bottomBarWrapper: {
    backgroundColor: '#fbb040',
    height: 5,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute'
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 5,
    justifyContent: 'space-evenly',
    height: 50,
    backgroundColor: '#fbb040',
    borderRadius: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
  modalContainer: {

  },
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 28,
  },
};

export default ChallengeDetailPage;
