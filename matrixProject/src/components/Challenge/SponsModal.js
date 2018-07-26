import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, Picker } from 'react-native';

class SponsModal extends Component {
  state = {user: ''}
    updateUser = (user) => {
       this.setState({ user: user })
    }

  render() {
    const numbers = [0,1,2,3,4,5,6,7,8,9]
    const pickerItems = numbers.map((number)=>
    <Picker.Item label={number.toString()} value={number} />
    )
  return (
      <Modal
        transparent
        animationType="slide"
        //visible={visible}
      >
        <View style={styles.container}>
        <View style={styles.topTab}>
          <TouchableOpacity style={styles.tab1}>
            <Text>当前余额</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab2}>
            <Text>充值余额</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text>赞助了</Text>
        </View>
        <View style={styles.scrollNumber}>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue = {this.state.user}
              onValueChange = {this.updateUser}>
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue = {this.state.user}
              onValueChange = {this.updateUser}>
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue = {this.state.user}
              onValueChange = {this.updateUser}>
              {pickerItems}
            </Picker>
            <Picker
              itemStyle={styles.numberText}
              style={styles.contentContainer}
              selectedValue = {this.state.user}
              onValueChange = {this.updateUser}>
              {pickerItems}
            </Picker>
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
      borderColor: 'black',
      borderWidth: 5
    },
    topTab: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    tab1: {
      borderRadius: 20,
      backgroundColor: 'red',
      alignItems: 'center',
      width: '40%',
      height: 40,
    },
    tab2: {
      borderRadius: 20,
      backgroundColor: 'pink',
      alignItems: 'center',
      width: '60%',
      height: 40
    },
    content: {
      //top: '10%'
    },
    scrollNumber: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: '5%'
    },
    contentContainer: {
      backgroundColor: 'pink',
      marginHorizontal: '1%',
      width: 50,
      height: 140,
      justifyContent:'center',
      padding: 0
    },
    numberText: {
      fontSize: 48,
      color: 'black'
    }
};

export default SponsModal; //to enable export from index.js
