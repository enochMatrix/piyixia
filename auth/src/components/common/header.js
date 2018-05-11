// import lib for making a component
import React from 'react';
import { Text, View } from 'react-native';

// making a component
const Header = (props) => {
//  const { textStyle, viewStyle } = styles;
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{ props.headerText }</Text>
   </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative',
    paddingTop: 15,
    height: 60
  },
  textStyle: {
    fontSize: 20
  }
};

// make component available to other parts of the app
export { Header };
// means taking that component, I want other files within our project to be able to make use of it.
