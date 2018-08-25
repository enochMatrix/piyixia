import React, {Component} from 'react';
import { View, Text, Image ,TouchableOpacity} from 'react-native';

class Accepted extends Component {


    constructor(props){
      super(props);
      this.buttonPress = this.buttonPress.bind(this);
    }

    buttonPress() {
      console.log('called', this.props);
      this.props.props.navigation.navigate('TikiPage');
    }

    render() {
      

      return (
          <View style={styles.container}>
              <View style={styles.profileContainer}>
                      <View style={styles.icon} >
                       <Image source={{ url: 'https://firebasestorage.googleapis.com/v0/b/piyixia-562cf.appspot.com/o/image%2F1529294093237c894ebe838.jpeg?alt=media&token=d25d5561-ce8a-45b3-baea-0d14f77b157c' }} /> 
                      </View>
                      <Text style={styles.textStyle}>大司马</Text>
              </View>

            <View style={styles.centerStyle}><Text> 😄 </Text></View>

            <View style={styles.contentContainer} >
              <Text style={styles.acceptTextStyle}>接受</Text>
            </View>

            <View style={styles.playLogoContainer}>
            <TouchableOpacity
                 onPress={this.buttonPress}
             >
              <Image  style={styles.tvLogo} source={require('../../Logo/tv.png')}/> 
              </TouchableOpacity >
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
