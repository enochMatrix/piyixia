import React, {Component} from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

class ChallengeCard extends Component {

    // set state and list view data
    constructor(props) {
        super(props);
}

    render() {
      return (
        <View style={{ backgroundColor: 'white', borderRadius: 10, flexDirection: 'column', marginTop: 4 }}>
          <View style={{ paddingTop: '2%', paddingHorizontal: '2%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ width:15, height:15, backgroundColor:'gray', borderRadius: 10 }} />
              <Text style={styles.textStyle}>{this.props.username}</Text>
              <Text style={styles.textStyle}>{'·' + this.props.time}</Text>
            </View>
            <Text>💗</Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 16, paddingLeft: '2%' }}>{this.props.title}</Text>
          </View>

          {this.props.image &&
          <View style={{ marginTop: 5, flexDirection: 'row', flex: 1 }}>
            <Image
              source={require('./0.jpeg')}
              style={{ width: 120, height: 90, flex: 0.4 }}
            />
            <View style={{ flex: 0.6 }}>
              <Text style={styles.textStyle}>{this.props.description}</Text>
            </View>
          </View>
          }

          {!this.props.image &&
            <View style={{ marginTop: 5 }}>
                <Text style={styles.textStyle}>{this.props.description}</Text>
            </View>
          }

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.tabStyle}>
              <Text style={styles.textStyle}>{this.props.sponsor}</Text>
            </View>
            <View style={styles.tab2Wrapper}>
            <View style={styles.tab2Style}>
              <Text style={styles.textStyle}>{this.props.timeLeft}</Text>
            </View>
            </View>
            <View style={styles.tabStyle}>
              <Text style={styles.textStyle}>{this.props.comment}</Text>
            </View>
          </View>
        </View>
      );
}
}

const styles = {
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: '33.33%',
    backgroundColor: '#d3d3d3',
    marginTop: 16,
    borderBottomRadius: 5,
  },
  tab2Style: {
    marginTop: -12,
    backgroundColor: '#c4c4c4',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    zIndex: 10
  },
  tab2Wrapper: {
    marginTop: 16,
    backgroundColor: '#c4c4c4',
    width: '33.33%',
    height: 28,
    justifyContent: 'space-between',
  },
  textStyle: {
    paddingLeft: '2%',
    fontSize: 14,
    color: '#606060',
    letterSpacing: 1,
    lineHeight:18
  }
};

export default ChallengeCard;
