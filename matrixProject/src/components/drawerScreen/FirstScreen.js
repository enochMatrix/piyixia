import React from 'react';
import { Text, View, Image, FlatList, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { DrawerActions } from 'react-navigation';
import { Header, Left, Icon, Right } from 'native-base';
import Swipeout from 'react-native-swipeout';
import IconChange from '../profilepage/Icon';

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

    deleteItem =(id) => {
      console.log(id);
        const item = this.state.transaction;
        item.splice(id, 1);
        this.setState({
            transcation: item
        });
    };

    _renderItem = ({ item, index }) => {
        let backgroundColor = 'red';
        if (index % 2 === 0) {
           backgroundColor = '#cccccc';
        } else {
          backgroundColor = 'white';
        }
        const swipeoutBtn = [
          {
          text: 'Delete',
          backgroundColor: 'red',
          onPress: () => { this.deleteItem(index); }
          }
        ];
        return (
          <Swipeout
            backgroundColor='white'
            right={swipeoutBtn}
          >
              <View style={[styles.message, { backgroundColor: backgroundColor }]}>
                  <Text style={styles.bubble}>
                      {item.usage}
                  </Text>
                  <Text style={styles.time}>
                      {item.date}
                  </Text>
              </View>
          </Swipeout>
  );
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
                  <Text style={styles.userNameText}>{this.state.userName}</Text>
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
                    <Text style={styles.moneyText}>金币余额</Text>
                    <Text style={styles.moneyNumber}>{this.state.diamond}</Text>
              </View>

              <View style={styles.listTextContainer}>
                  <View>
                    <Text style={styles.listText}>消息列表</Text>
                  </View>
                  <View>
                      <Text style={styles.listText}>删除全部</Text>
                  </View>
              </View>
              <View style={styles.aLine} />

              <View style={styles.listContainer}>
                  <FlatList
                    data={this.state.transaction}
                    renderItem={this._renderItem}
                  />
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
      width: 500,
      backgroundColor: 'gray',
      borderBottomRightRadius: 170,
      borderBottomLeftRadius: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconContainer2: {
      height: 150,
      width: 600,
      backgroundColor: '#cccccc',
      borderBottomRightRadius: 980,
      borderBottomLeftRadius: 980,
      alignItems: 'center',
      justifyContent: 'center'
    },
    userNameContainer: {
      marginTop: 5
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
      justifyContent: 'center'
    },
    moneyText: {
      fontSize: 16,
      color: 'gray'
    },
    moneyNumber: {
      fontSize: 20,
      color: 'black'
    },
    listTextContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '95%',
    },
    listText: {
      color: 'gray'
    },
    aLine: {
      marginTop: 2,
      width: '95%',
      height: 3,
      backgroundColor: 'black'
    },
    listContainer: {
      marginTop: 5,
      paddingBottom: 450
    },
    message: {
      marginTop: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderRadius: 15,
      padding: 17,
    },
    bubble: {

    },
    time: {
      fontSize: 12,

    },
});
