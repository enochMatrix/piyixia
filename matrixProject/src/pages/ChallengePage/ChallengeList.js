import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';
import bottle from '../bottle';

class ChallengeList extends Component {

  // set state and list view data

  constructor(props) {
    super(props);
    this.props = props;
    this.jsonObject = [];

    this.challenge = [];
    this.onPressInDetail = this.onPressInDetail.bind(this);
    this.preload.bind(this);
  }
  state = {
    refreshing: true
  };

  componentWillMount() {
    this.preload();
  }

  preload = () => {

    bottle.container.DBService.getTargets("Challenge").then((snapshot) => {
      snapshot.forEach((doc) => {

        this.jsonObject.push(doc.data());
      })
    }).then(() => {
      this.challenge = this.jsonObject;
      this.setState({
        refreshing: false
      });
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }

  onPressInDetail(title, description, author, currentTime, url, id, profile) {
    console.log(this.props);
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
          item.url, item._id, item.profile)}
      >
        <ChallengeCard
          challenge={item}
          onPress={() => this.props.onPress(item._id)}
        />
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <View>
        <FlatList
          data={this.challenge}
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
