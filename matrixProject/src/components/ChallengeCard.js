import React, {Component} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

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
              <Text style={styles.textStyle}>用户名理小查发起于</Text>
              <Text style={styles.textStyle}>·2周前</Text>
            </View>
            <Text>💗</Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 16, paddingLeft: '2%' }}>标题标题标题标题标题标题</Text>
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={styles.textStyle}>描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述</Text>
          </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={styles.tabStyle}>
              <Text style={styles.textStyle}>13.6k</Text>
            </View>
            <View style={styles.tab2Wrapper}>
            <View style={styles.tab2Style}>
              <Text style={styles.textStyle}>12天6小时</Text>
            </View>
            </View>
            <View style={styles.tabStyle}>
              <Text style={styles.textStyle}>268</Text>
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
    color: '#606060'
  }
};

export default ChallengeCard;
