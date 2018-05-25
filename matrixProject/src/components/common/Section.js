import React from 'react';
import { View } from 'react-native';

//props is from albumDetail.js
const Section = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export { Section };
