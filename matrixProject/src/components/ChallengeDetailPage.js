import React, {Component} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import ChallengeContent from './Challenge/ChallengeContent';
import Sponsor from './Challenge/Sponsor';
import Accepted from './Challenge/Accepted';
import CommentPage from './Challenge/commentPage';
import YesOrNo from './common/YesOrNo';
import SponsModal from './Challenge/SponsModal';

class ChallengeDetailPage extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
        this.comment = this.comment.bind(this);
        this.state = {
          commentModalVisible: false,
        };
}

    comment() {
      console.log('comment!');
      this.setState({ commentModalVisible: true });
    }

    share() {
      console.log('share!');
    }

    sponsor() {
      console.log('sponsor');
    }

    render() {
      console.log('challengeDetailPage');
      const { title, description, author, currentTime, url } = this.props.navigation.state.params;
      return (
        <View style={{ flex: 1, backgroundColor: '#bababa' }}>
          <View style={{ paddingBottom: 5 }}>
          <ScrollView>
          <View style={[styles.cardStyle, { flexDirection: 'column' }]}>
            <ChallengeContent
              title={title}
              description={description}
              author={author}
              currentTime={currentTime}
              url={url}
            />
            <View style={styles.line} />
            <Sponsor />
          </View>

          <View style={[styles.cardStyle, { flexDirection: 'row' }]}>
          <Accepted />
          </View>

          <View style={[styles.cardStyle, { flexDirection: 'column', marginBottom: 20}]}>
            <CommentPage />
          </View>

          </ScrollView>
          </View>

          <View style={{ position: 'absolute', left: 0, bottom: 0, right: 0 }}>
            <View style={styles.bottomBar}>
            <View>
              <Text style={styles.textStyle}>转发</Text>
            </View>
            <View style={styles.verticalLine} />
            <TouchableOpacity
              onPress={this.comment}
            >
              <Text style={styles.textStyle}>评论</Text>
            </TouchableOpacity>
            <View style={styles.verticalLine} />
            <View>
              <Text style={styles.textStyle}>赞助</Text>
            </View>
            <View style={styles.bottomBarWrapper} />
            </View>
          </View>

          <YesOrNo
            onPressYes={this.share.bind(this)}
            onPressNo={() => { this.setState({ commentModalVisible: false }); }}
            children='是否立即赞助'
            visible={this.state.commentModalVisible}
          />
          <SponsModal />
        </View>
      );
}
}

const styles = {
  textStyle: {
    paddingLeft: '2%',
    fontSize: 13,
    color: '#606060',
    letterSpacing: 0.7,
    lineHeight: 18
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
    paddingBottom: '2%',
    paddingHorizontal: '2%'
  },
  bottomBarWrapper: {
    backgroundColor: '#cccccc',
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
    height: 30,
    backgroundColor: '#cccccc',
    borderRadius: 10
  },
  modalContainer: {

  }
};

export default ChallengeDetailPage;
