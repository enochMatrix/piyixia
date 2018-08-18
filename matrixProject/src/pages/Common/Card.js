import React from 'react';
import { View } from 'react-native';

//props is from albumDetail.js
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flex: 3,
  }
};

export { Card };
