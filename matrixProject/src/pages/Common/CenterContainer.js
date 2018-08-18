import React from 'react';
import { View } from 'react-native';

//props is passed from albumDetail.js
const CenterContainer = (props) => {
    return (
      <View style={styles.containerStyle}>
        {props.children}
      </View>
    );
};

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { CenterContainer };
