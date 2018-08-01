import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback
} from 'react-native';
//import { SearchBar } from 'react-native-elements'
import Tabs from 'react-native-tabs';
import { Search } from './icons';
import ChallengeList from './ChallengeList';

class RefreshableList extends Component {
  static navigationOptions = { header: null };
    // set state and list view data

    constructor(props) {
        super(props);
        this.state = {
          searchContent: '',
          page: 'trending',
        };
        this.onPressInIcon = this.onPressInIcon.bind(this);
        this.onPressInCreate = this.onPressInCreate.bind(this);
        this.onPressInCreateComment = this.onPressInCreateComment.bind(this);
      }

    onPressInIcon() {
      this.props.navigation.navigate('ProfilePage');
    }

    onPressInCreate() {
      this.props.navigation.navigate('CreateChallenge');
    }

    onPressInCreateComment(cid) {
      this.props.navigation.navigate('CreateComment', {
        cid: cid
      });
      console.log('onpressin');
    }

    render() {
      console.log('challengePage');
      return (
        <View>
          {/*搜索栏*/}
          <View style={styles.topBarContainer}>
            <TouchableWithoutFeedback onPress={this.onPressInIcon}>
              <View style={{ width: 30, height: 30, backgroundColor: 'gray', borderRadius: 20 }} />
            </TouchableWithoutFeedback>

            <View style={styles.searchBarContainer}>
              <Search />
              <TextInput
                  style={{ height: 20, backgroundColor: '#ededed' }}
                  onChangeText={(text) => { this.setState({ searchContent: text }); }}
                  placeholder='皮一下皮一下皮一下'
              />
            </View>

            <View style={{ height: 30, justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.onPressInCreate}>
              <Text style={styles.textStyle}>发起</Text>
            </TouchableOpacity>
            </View>

          </View>

          {/*TAB BAR*/}
          <View style={{ paddingTop: 35 }}>
          <Tabs
            style={{ height: 20, borderColor: 'gray' }}
            selected={this.state.page}
            selectedIconStyle={{ height: 27, borderBottomWidth: 2, borderBottomColor: 'black' }}
            onSelect={el => this.setState({ page: el.props.name })}
          >
              <Text style={styles.textStyle} name="trending">推荐</Text>
              <Text style={styles.textStyle} name="my">我的</Text>
          </Tabs>
          </View>
          <View style={{ height: 4.5 }} />

          {/*ChallengeCard*/}
          <View style={{ backgroundColor: '#bababa', paddingBottom: 202 }}>
          <ChallengeList
            navigation={this.props.navigation}
            onPress={this.onPressInCreateComment}
          />
          </View>
        </View>
      );
}
}

const styles = {
  textStyle: {
    fontSize: 13,
    color: '#606060'
  },
  topBarContainer: {
    flexDirection: 'row',
    paddingTop: '8%',
    marginHorizontal: '3%',
    justifyContent: 'space-between',
  },
  searchBarContainer: {
    width: '70%',
    height: 28,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5
  }
};

export default RefreshableList;
