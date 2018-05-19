import React from 'react';
import {Text,StyleSheet} from 'react-native';

const headingText =props =>(
    <Text {...props}
    style={[styles.textHeading]}>
        {props.children}
    </Text>
);
const styles = StyleSheet.create({
    //the advantage of StyleSheet.create instead of Object
    //1. validate the style
    //2. transfer to native language more efficiently
    textHeading:{
        fontSize: 28,
        fontWeight: "bold"
//fontSize,fontWeight only 2 properties in Text
    },

});


export  default headingText;
