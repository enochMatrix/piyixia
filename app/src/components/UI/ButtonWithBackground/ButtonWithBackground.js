import React from 'react';
import {TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
    Text,
    View,
    StyleSheet} from 'react-native';

const buttonWithBackground = props => {

    const content = (
        <View style={[styles.button,
            {backgroundColor: props.color},
            props.disabled ? null : styles.disabled]}>
            <Text style={props.disabled ? null: styles.disabledText}>{props.children}</Text>
        </View>
    );
//  Platform API TO deal with different OS
    if( !props.disabled ) {
        return content;
    }
    if(Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>)
    } else {
        return (
            <TouchableOpacity>
                {content}
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
   button: {
       padding: 10,
       margin: 5,
       borderRadius: 5,
       borderWidth: 1,
       borderColor: "black"
   },
    disabled: {
       backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disabledText: {
       color: "#aaa"
    }
});

export default buttonWithBackground;
