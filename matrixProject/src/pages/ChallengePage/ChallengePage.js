import React, { Component } from 'react';
import {
  View, TouchableOpacity, Text, TextInput, TouchableWithoutFeedback, Image
} from 'react-native';
//import { SearchBar } from 'react-native-elements'
import Tabs from 'react-native-tabs';
import { Search } from '../icons';
import ChallengeList from './ChallengeList';
import SponsModal from './components/SponsModal';



class RefreshableList extends Component {
  static navigationOptions = { header: null };
  // set state and list view data

  constructor(props) {
    super(props);
    this.state = {
      searchContent: '',
      page: 'trending',
      sponsor: false
    };
    this.onPressInIcon = this.onPressInIcon.bind(this);
    this.onPressInCreate = this.onPressInCreate.bind(this);
    this.onPressInCreateComment = this.onPressInCreateComment.bind(this);
    this.onPressInSponsor = this.onPressInSponsor.bind(this);
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


  onPressInSponsor = () => {
    this.setState({ sponsor: true });
  }

  render() {
    console.log('challengePage');
    return (
      <View>
        {/*搜索栏*/}
        <View style={styles.topBarContainer}>
          <TouchableWithoutFeedback onPress={this.onPressInIcon}>
            <View style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }}>
              <Image style={{ width: 30, height: 30, backgroundColor: 'grey', borderRadius: 20 }} source={{ url: 'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1529294093237c894ebe838.jpeg?alt=media&token=d25d5561-ce8a-45b3-baea-0d14f77b157c' }} />
            </View>
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
                <View style={styles.statusTab}>
                  <Image style={{ width: 30, height: 30, borderRadius: 20 }} source={require('../../assets/piFist.png')} />
                  <Text style={styles.textStyle}>发起</Text>
              </View>
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
          {
            this.state.sponsor &&
            <SponsModal cid="a1" />
          }
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
    justifyContent: 'space-between',
    backgroundColor:'#fbb040'
  },
  searchBarContainer: {
    width: '70%',
    height: 28,
    backgroundColor: '#ededed',
    flexDirection: 'row',
    paddingHorizontal: '2%',
    paddingVertical: '1%',
    borderRadius: 5
  },
  statusTab: {
    flexDirection: 'row',
    marginTop: -12,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 10,
    marginRight:5
  }
};

export default RefreshableList;
