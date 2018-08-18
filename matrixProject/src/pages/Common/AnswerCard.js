import React from 'react';
import { View, Text } from 'react-native';

const AnswerCard = ({ onPress, children }) => {
  const { textStyle, cardStyle } = styles;
  return (
    <View style={cardStyle}>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
};

const styles = {
  textStyle: {

  },
  cardStyle: {
    flex: 2,
    padding: 5,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    marginTop: 15,
    flexDirection: 'row',
    borderColor: 'black',
    position: 'relative',
    justifyContent: 'center'
  }
};

export { AnswerCard };
