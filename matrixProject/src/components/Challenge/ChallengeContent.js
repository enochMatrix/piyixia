import React, {Component} from 'react';
import { View, Text } from 'react-native';

class ChallengeContent extends Component {

    render() {
      return (
          <View>
          <View style={{ marginTop: '2%', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
              <View style={{ width: 15, height: 15, backgroundColor: 'gray', borderRadius: 10 }} />
              <Text style={styles.textStyle}>用户名理小查发起于</Text>
              <Text style={styles.textStyle}>· 7-15 18:45</Text>
            </View>
            <Text>💗</Text>
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={{ fontSize: 16, paddingLeft: '2%' }}>单手吃鸡</Text>
          </View>

          <View style={{ marginTop: 5, marginBottom: 15 }}>
            <Text style={styles.textStyle}>马老师，你可以单手玩一盘吃鸡吗？我赌你撑不过五分钟 </Text>
          </View>
          </View>
      );
}
}

const styles = {
  textStyle: {
    paddingLeft: '2%',
    fontSize: 14,
    color: '#606060'
  },
  line: {
    backgroundColor: '#cccccc',
    height: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  }
};

export default ChallengeContent;
