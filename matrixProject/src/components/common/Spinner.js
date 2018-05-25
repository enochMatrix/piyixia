import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
  return (          //spinner has proporty size small or large
    <View style={style.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

const style = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export { Spinner };
