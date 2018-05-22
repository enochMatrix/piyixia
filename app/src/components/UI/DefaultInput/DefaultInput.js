import React from 'react';
import {TextInput, StyleSheet} from 'react-native';


const defaultInput = props => (
    <TextInput
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style]}/>
);

const styles = StyleSheet.create({
    input: {
        width: "100%", // relavent is better
        borderWidth: 2,
        borderColor: "#eee",
        padding: 5,
        marginTop: 8,
        marginBottom: 8
    }
});


export default defaultInput;
