import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';
import bottle from '../bottle';
import 'firebase/firestore'
import ChallengeController from "../Service/challengeControl.js";

class ChallengeList extends Component {

  // set state and list view data

  jsonObject = [];

  constructor(props) {
    super(props);

    this.challengeManager = ChallengeController();
   
    this.onPressInDetail = this.onPressInDetail.bind(this);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);

  }
  state = { challenge: [], refreshing: true };

  componentWillMount() {

    this.preload();
    this.makeRemoteRequest();
  }

  preload = () => {

    bottle.container.DBService.get("Challenge").then(function (snapshot) {
      snapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        json.push(doc.data());
      })
    }).then(() => {
      this.setState({ challenge: json });
      this.setState({
        refreshing: false
      });
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
  }

  onPressInDetail(title, description, author, currentTime, url, id,profile) {
    this.props.navigation.navigate('ChallengeDetailPage', {
      title: title,
      description: description,
      author: author,
      currentTime: currentTime,
      url: url,
      id: id,
      profile: profile
    });
  }

  makeRemoteRequest() {
 
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.preload();
    });
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onPressInDetail(item.title,
          item.description, item.author, item.currentTime,
          item.url, item._id,item.profile)}
      >
        <ChallengeCard
          challenge={item}
          onPress={() => this.props.onPress(item._id)}
        />
      </TouchableOpacity>
    );
  }

  render() {
    console.log('ChallengeList');
    console.log(this.state.challenge);
    return (
      <View>
        <FlatList
          data={this.state.challenge}
          renderItem={this.renderItem}
          extraData={this.state}
          keyExtractor={item => item.title}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    );
  }
}


export default ChallengeList;
