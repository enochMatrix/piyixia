import React, {Component} from 'react';
import { View, Text } from 'react-native';

class Accepted extends Component {

    render() {
      return (
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center', padding:'1%'}}>
              <View style={{ width:45, height:45, backgroundColor: '#bababa', borderRadius: 25 }} />
              <Text>大司马</Text>
            </View>

            <View style={styles.centerStyle}><Text>😄😁 </Text></View>

            <View style={[styles.centerStyle, { width: '60%' }]} >
              <Text>回复回复回复回复回复回复回复回复回复回复回复回复回复...</Text>
            </View>

            <View style={styles.centerStyle}>
            <View style={{ width: 35, height: 20, borderWidth: 1, borderColor: 'black' }} />
            </View>

          </View>
      );
}
}

const styles = {
  centerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2
  }
};

export default Accepted;
