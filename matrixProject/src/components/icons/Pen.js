import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Pen = (prop) => {
  return (
    <View>
      <Icon name='pencil' type='FontAwesome' size={25} color={prop.color} />
    </View>
  );
};

export { Pen };
