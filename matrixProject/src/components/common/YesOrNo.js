import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const YesOrNo = ({ onPressYes, onPressNo, children, visible }) => {
  return ( // making Buttons reusable!

      <Modal
        transparent
        animationType="slide"
        visible={visible}
      >
        <View style={styles.container}>
        <TouchableOpacity onPress={() => onPressYes()}>
          <View style={[styles.buttonContainer, { backgroundColor: '#cccccc', width: 80 }]}>
            <Text>YES</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Text>{children}</Text>
        </View>
        <TouchableOpacity onPress={() => onPressNo()}>
          <View style={[styles.buttonContainer, { backgroundColor: 'gray', width: 80 }]}>
            <Text>NO</Text>
          </View>
        </TouchableOpacity>
        </View>
      </Modal>

  );
};

const styles = {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderRadius: 20,
      backgroundColor: 'pink',
      height: 207,
      top: '126%',
    },
    buttonContainer: {
      height: 207,
      alignItems: 'center',
      justifyContent: 'center'
    }
};

export default YesOrNo; //to enable export from index.js
