import React, {Component} from 'react';
import { View, Text, Image } from 'react-native';

class Accepted extends Component {

    render() {
      return (
          <View style={styles.container}>
              <View style={styles.profileContainer}>
                      <View style={styles.icon} />
                      <Text style={styles.textStyle}>大司马</Text>
              </View>

            <View style={styles.centerStyle}><Text> 😄 </Text></View>

            <View style={styles.contentContainer} >
              <Text style={styles.acceptTextStyle}>接受</Text>
            </View>

            <View style={styles.playLogoContainer}>
              <Image
                source={require('../Logo/tv.png')}
                style={styles.tvLogo}
              />
              <Text style={styles.playText}>点击播放</Text>
            </View>

          </View>
      );
}
}

const styles = {
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  profileContainer: {
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
     margin: 5
  },
  icon: {
     width: 45,
     height: 45,
     backgroundColor: '#bababa',
     borderRadius: 25
  },
  textStyle: {
    fontSize: 12,
    color: 'gray'
  },
  centerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2
  },
  tvLogo: {
    width: 40,
    height: 40
  },
  acceptTextStyle: {
    textAlign: 'left'
  },
  playText: {
    fontSize: 11
  },
  playLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    width: '60%',
    // alignItems: 'center',
    paddingLeft: 5,
    justifyContent: 'center',
  }
};

export default Accepted;
