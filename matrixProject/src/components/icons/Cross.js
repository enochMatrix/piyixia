import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Cross = () => {
  return (
    <View>
      <Icon name='close' type='FontAwesome' size={30} color='#383838' />
    </View>
  );
};

export { Cross };
