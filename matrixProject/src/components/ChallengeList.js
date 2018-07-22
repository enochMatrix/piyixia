import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import ChallengeCard from './ChallengeCard';

class ChallengeList extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
}

    renderItem() {
      return (
        <View>
        <TouchableOpacity onPressIn={this.props.onPress}>
          <ChallengeCard />
        </TouchableOpacity>
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        <ChallengeCard />
        </View>
      );
    }

    render() {
      return (
        <View>
        <ScrollView>
          {this.renderItem()}
        </ScrollView>
        </View>
      );
}
}


export default ChallengeList;
