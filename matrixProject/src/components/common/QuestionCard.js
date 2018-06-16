import React from 'react';
import { Text, View } from 'react-native';

const QuestionCard = (prop) => {
  const { textStyle, cardStyle } = styles;
  return (
    <View style={cardStyle}>
      <Text style={textStyle}>{prop.children}</Text>
    </View>
  );
};

const styles = {
  textStyle: {

  },
  cardStyle: {
    flex: 0.8,
    borderWidth: 1,
    padding: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: 'black',
    position: 'relative'
  }
};

export { QuestionCard };
