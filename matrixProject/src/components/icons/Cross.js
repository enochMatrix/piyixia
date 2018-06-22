import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cross = (props) => {
  return (
      <Icon.Button onPress={props.onPress} name='close' size={30} backgroundColor='rgba(0,0,0,0)' color='black' />
  );
};

export { Cross };
