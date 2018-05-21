import React from 'react';//return JSX file
import {TextInput,StyleSheet} from 'react-native';

const DefaultInput = (props)=>(
    <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style]}/>

);

const styles = StyleSheet.create({
    //the advantage of StyleSheet.create instead of Object
    //1. validate the style
    //2. transfer to native language more efficiently
    input:{
        borderWidth: 1,
        borderColor:"pink",
        padding:5,
        marginTop:8,
        marginBottom:8,
        width: "100%"
    },
});


export default DefaultInput;