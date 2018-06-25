import React, { Component } from 'react';
import { Text, View, Image, ListView } from 'react-native';
import ScoreData from './userScore.json';

class ScoreBoard extends Component {

  state = {
    dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    userName: 'Kwan',
    userScore: 23780,
    userRank: 0
 };

componentWillMount() {
    this.rankUser();
  this.setState({ dataSource: this.state.dataSource.cloneWithRows(ScoreData.data) });
}

rankUser() {
  const rank = ScoreData.data.findIndex((item) => {
    return item.name === this.state.userName;
  });
  this.setState({ userRank: rank + 1 });
}

sortFunction() {
  const result = ScoreData.data.sort((a, b) => {
      return (b.score - a.score);
  });
  return result;
}

renderItem = (item, index) => {
  const oddRowColor = 'white';
  const evenRowColor = '#f2f5f7';
  const rowColor = index % 2 === 0 ? evenRowColor : oddRowColor;
  const { rowsContainerStyle, numberContainerStyle, scoreStyle, imageBorderStyle } = styles;
  return (
    <View style={[rowsContainerStyle, { backgroundColor: rowColor }]} key={index}>
      <View style={numberContainerStyle}>
        <Text style={{ fontSize: 15, marginRight: 10, marginLeft: 10 }}>
          {parseInt(index, 10) + 1}.
        </Text>

        <View style={[imageBorderStyle, { width: 36, height: 36, borderRadius: 20 }]}>
        <Image
          source={{ uri: item.icon }}
          style={{ width: 20, height: 20 }}
        />
        </View>

        <Text style={{ fontSize: 15, flex: 1, paddingRight: 80, paddingLeft: 10 }}>
          {item.name}
        </Text>
      </View>
      <Text style={scoreStyle}>{item.score} pts</Text>
    </View>
  );
}

  render() {
    console.log('renderScoreBoard');
    this.sortFunction();
    return (
      <View style={{ borderWidth: 1, borderColor: 'gray', backgroundColor: 'white', flex: 1 }}>
        <View
          style={{
            backgroundColor: '#d6d8db',
            alignItems: 'center',
            marginBottom: 6
          }}
        >
        <View
          style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
                marginTop: 10
      }}>
        <Text
          style={{ color: 'black', fontSize: 18, flex: 1, textAlign: 'right', marginRight: 60 }}
        >
        {this.state.userRank}th
        </Text>

        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={[styles.imageBorderStyle, { width: 70, height: 70, borderRadius: 40 }]}>
          <Image
            source={{ uri: 'https://cdn.shopify.com/s/files/1/1061/1924/products/OMG_Cat_Emoji_ios10_large.png?v=1513249394' }}
            style={{ width: 50, height: 50 }}
          />
        </View>
          <Text style={{ fontSize: 18 }}>{this.state.userName}</Text>
        </View>

          <Text style={{ color: 'black', fontSize: 18, flex: 1, marginLeft: 40 }}>
            {this.state.userScore}<Text style={{ fontSize: 13 }}> pts</Text>
          </Text>
        </View>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={(data, someShit, i) => this.renderItem(data, i)}
          enableEmptySections
        />
      </View>
    );
  }
}

const styles = {
  rowsContainerStyle: {
    paddingTop: 7,
    paddingBottom: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: 'black'
  },
  numberContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  scoreStyle: {
    fontSize: 13,
    position: 'absolute',
    right: 15,
    paddingLeft: 15
  },
  imageBorderStyle: {
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
};

export default ScoreBoard;
