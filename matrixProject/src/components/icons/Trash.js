import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const Trash = () => {
  return (
    <View>
      <Icon name='trash' type='SimpleLineIcons' size={15} color='gray' />
    </View>
  );
};

export { Trash };
