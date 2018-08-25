import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';
import firebase from 'firebase/app';
import 'firebase/firestore'

class ChallengeList extends Component {

  // set state and list view data
  config = {
    apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
    authDomain: "piyixia-562cf.firebaseapp.com",
    databaseURL: "https://piyixia-562cf.firebaseio.com",
    projectId: "piyixia-562cf",
    storageBucket: "piyixia-562cf.appspot.com",
    messagingSenderId: "157139696379"
  };

  jsonObject = [];

  constructor(props) {
    super(props);
    if (!firebase.apps.length) {
      console.log(firebase.length);
      firebase.initializeApp(this.config);
    }
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);


    this.onPressInDetail = this.onPressInDetail.bind(this);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);

  }
  state = { challenge: [], refreshing: true };

  componentWillMount() {
    console.log('will');
    this.preload();
    this.makeRemoteRequest();
  }

  preload = () => {
    var docRef = this.db.collection("Challenge");
    var json = [];
    console.log(docRef);
    docRef.get().then(function (snapshot) {
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
