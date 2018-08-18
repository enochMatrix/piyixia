
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Picker, Button, Alert } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


class SponsModal extends Component {

  config = {
    apiKey: "AIzaSyApicAg8teSzkggqcaGqHnv3T_VFedXZPE",
    authDomain: "piyixia-562cf.firebaseapp.com",
    databaseURL: "https://piyixia-562cf.firebaseio.com",
    projectId: "piyixia-562cf",
    storageBucket: "piyixia-562cf.appspot.com",
    messagingSenderId: "157139696379"
  };

  db = null;

  constructor(props) {
    super(props);
    this.tabSelect = this.tabSelect.bind(this);
    this.confirmSpons = this.confirmSpons.bind(this);
    this.sponsAChallenge = this.sponsAChallenge.bind(this);

    if (!firebase.apps.length) {
      console.log(firebase.length);
      firebase.initializeApp(this.config);
    }
    this.db = firebase.firestore();
    const settings = { timestampsInSnapshots: true };
    this.db.settings(settings);
    this.state = {
      thousand: 0,
      hundred: 0,
      ten: 0,
      num: 0,
      tabSelected: true
    };
  }


  componentWillMount() {
    this.setState({ tabSelected: true });
  }

  tabSelect() {
    this.setState({ tabSelected: !this.state.tabSelected });
  }

  confirmSpons() {
    const number = this.state.thousand * 1000
      + this.state.hundred * 100
      + this.state.ten * 10
      + this.state.num;
    //this.addDiamond(number);
    //  this.setState({ diamond: number });
    if (this.state.tabSelected) {
      this.sponsAChallenge(number);
    } else {
      this.addDiamond(number);
    }
    this.props.onPressCancel();
  }

  sponsAChallenge(diamond) {
    console.log(this.props);
    this.db.collection("Challenge").doc('a10').update({
      diamond: 500
    })
      .then((response) => (response))
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        // if (res === 'success') {
        //   this.props.onPressOk(diamond.toString());
        // }
        console.log(res);
       
      });
  }

  addDiamond(diamond) {

    db.collection("Challenge").where("cid", "==", this.props.cid).set({
      diamond: 500
    }).then((response) => (response.text()))
      .catch((error) => {
        console.log(error);
      })
      .then((res) => {
        // if (res === 'success') {
        //   Alert.alert('充值成功');
        //   this.setState({ tabSelected: true });
        // }
        console.log(res);
      });
  }

  render() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const pickerItems = numbers.map((number) =>
      <Picker.Item label={number.toString()} value={number} key={number} />
    );
    return (
      <Modal
        transparent
        animationType="slide"
        visible={this.props.visible}
      >
        <View style={styles.container}>

          <View style={styles.topTab}>
            <TouchableOpacity
              style={this.state.tabSelected ? styles.tab1 : styles.tab2}
              onPress={this.tabSelect}
            >
              <Text
                style={this.state.tabSelected ? { color: 'white' } : { color: 'black' }}
              >
                当前余额
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={this.state.tabSelected ? styles.tab2 : styles.tab1}
              onPress={this.tabSelect}
            >
              <Text
                style={this.state.tabSelected ? { color: 'black' } : { color: 'white' }}
              >充值余额
            </Text>
            </TouchableOpacity>
          </View>


          <View style={styles.content}>
            {this.state.tabSelected ?
              <Text>理小查老板赞助了</Text> :
              <Text>充值金额</Text>
            }
          </View>
          <View style={styles.scrollNumber}>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue={this.state.thousand}
              onValueChange={(value) => { this.setState({ thousand: value }); }}
            >
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue={this.state.hundred}
              onValueChange={(value) => { this.setState({ hundred: value }); }}
            >
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue={this.state.ten}
              onValueChange={(value) => { this.setState({ ten: value }); }}
            >
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue={this.state.num}
              onValueChange={(value) => { this.setState({ num: value }); }}
            >
              {pickerItems}
            </Picker>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: '1%' }}>
            <Button
              onPress={this.confirmSpons}
              title='确认'
              color='gray'
            />
            <Button
              onPress={this.props.onPressCancel}
              title='取消'
              color='gray'
            />
          </View>

        </View>
      </Modal>

    );
  }
}

const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
    height: 307,
    top: '56%',
  },
  topTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab1: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    height: 40,
  },
  tab2: {
    backgroundColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: 40
  },
  content: {
    top: '5%',
  },
  scrollNumber: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '5%'
  },
  contentContainer: {
    backgroundColor: '#cccccc',
    marginHorizontal: '1%',
    width: 50,
    height: 140,
    justifyContent: 'center',
    padding: 0
  },
  numberText: {
    fontSize: 48,
    color: 'black'
  }
};

export default SponsModal; //to enable export from index.js
