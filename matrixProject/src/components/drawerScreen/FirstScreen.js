import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Icon } from 'native-base';
import IconChange from '../profilepage/Icon';
import MessageList from '../profilepage/messageList';
import { Plus, Pen } from '../icons';

export default class FirstScreen extends React.Component {

  constructor(prop) {
    super();
    this.state = {
        transaction: null,
        userName: '',
        avatar: '',
        diamond: 0
    };
    this.fetchUserInfo = this.fetchUserInfo.bind(this);
  }

    componentWillMount() {
      this.fetchUserInfo();
    }

    fetchUserInfo() {
      // GET ALL getUserTransaction
      fetch('http://192.168.10.107:3000/get/transaction', {
          credentials: 'same-origin',
      })
          .then((response) => (response.json()))
          .catch((error) => {
              console.log(error);
          })
          .then((res) => {
              console.log(res['0']);
              this.setState({
                transaction: res['0']['transaction'] ,
                userName: res['0']['username'],
                avatar: res['0']['avatar'],
                diamond: res['0']['diamond']
              });
          });
    }

    render() {
      console.log('profilepage');
        return (
            <View style={styles.container}>

              <View style={styles.iconContainer2}>
              <View style={styles.iconContainer}>
                  <IconChange
                    avatar={this.state.avatar}
                    update={() => this.fetchUserInfo}
                  />
                  <View style={styles.userNameContainer}>
                      <Text style={styles.userNameText}>{this.state.userName} </Text>
                      <Pen color='white' size={17} />
                  </View>

              </View>
              </View>

              <View style={styles.menuLogo}>
                        <Icon
                          name='menu'
                          style={{ color: 'white', fontSize: 40 }}
                          onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                        />
              </View>
              <View style={styles.money}>
                    <View style={styles.sameLineWrapper}>
                          <Image
                            source={require('../Logo/sponsor.png')}
                            style={{ width: 33, height: 33 }}
                          />
                          <Text style={styles.moneyText}>金币余额 </Text>
                          <Plus />
                    </View>
                    <Text style={styles.moneyNumber}>{this.state.diamond}</Text>
              </View>
              <View style={styles.messageListContainer}>
                <MessageList transaction={this.state.transaction} />
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      alignItems: 'center'
    },
    iconContainer: {
      height: 150,
      width: 400,
      backgroundColor: 'gray',
      borderBottomRightRadius: 270,
      borderBottomLeftRadius: 270,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer2: {
      height: 150,
      width: 450,
      backgroundColor: '#cccccc',
      borderBottomRightRadius: 350,
      borderBottomLeftRadius: 350,
      alignItems: 'center',
      justifyContent: 'center'
    },
    userNameContainer: {
      marginTop: 5,
      flexDirection: 'row',
      alignItems: 'center'
    },
    userNameText: {
      color: 'white'
    },
    menuLogo: {
      position: 'absolute',
      top: 15,
      right: 15,
    },
    money: {
      marginTop: 5,
      alignItems: 'center',
    },
    sameLineWrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    moneyText: {
      fontSize: 16,
      color: 'gray'
    },
    moneyNumber: {
      fontSize: 30,
      color: 'black',
      marginTop: -10
    },
    messageListContainer: {
      width: '95%'
    }
});
