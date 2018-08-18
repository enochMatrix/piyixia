import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Music = (prop) => {
  if (prop.off) {
  return (
    <View>
      <Icon name='music-note-off' type='MaterialCommunityIcons' size={45} color='white' />
    </View>
  );
}
  return (
    <View>
      <Icon name='music-note' type='MaterialCommunityIcons' size={45} color='white' />
    </View>
  );
};

export { Music };
