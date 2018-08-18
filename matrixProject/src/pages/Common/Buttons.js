import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Buttons = ({ onPress, children }) => {
  const { textStyle, buttonStyle } = styles;
  return ( // making Buttons reusable!
    <TouchableOpacity onPress={() => onPress()} style={buttonStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    width: 200,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Buttons }; //to enable export from index.js
