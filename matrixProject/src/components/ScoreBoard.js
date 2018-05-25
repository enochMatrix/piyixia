import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import ScoreData from './userScore.json';

class ScoreBoard extends Component {

state = { data: [] };

componentWillMount() {
  this.setState({ data: ScoreData.data });
}

sortFunction() {
  this.state.data.sort((a, b) => {
      return (b.highScore - a.highScore);
  });
}

render() {
  this.sortFunction();
    return (
      <View style={style.flatList}>
          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) =>
          <Text style={style.scoreBoardText}>
            {`${index + 1} ${item.userName} ${item.highScore}`}
          </Text>}
          keyExtractor={(item) => item.userName}
          />
        </View>
    );
  }
}

const style = {
  scoreBoardText: {
    padding: 5,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default ScoreBoard;
