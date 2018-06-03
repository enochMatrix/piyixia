import React from 'react';
import {TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
     Platform} from 'react-native';

const buttonWithBackground =props => {
    const Content=(
        <View style={[styles.button,
        {backgroundColor: props.color},
        !props.disabled?null:props.disabled]}>
        <Text style={props.disabled?null:styles.textColor}>
            {props.children}
            </Text>
    </View>);
    //content is the same, deffirent method of touch

    if(!props.disabled){
        return Content;
    }

        if(Platform.OS==='android'){
            //choose the OS
            return(
                <TouchableNativeFeedback onPress={props.onpress}>
                    {Content}
                </TouchableNativeFeedback>

            )
        }
        else{
            return(
                <TouchableOpacity onPress={props.onpress}>
                    {Content}
                </TouchableOpacity>)
        }







};

const styles =StyleSheet.create({
    button:{
        padding: 10,
        margin: 5,
        borderRadius:5,
        borderColor:"black"
    },
    disabled:{
        backgroundColor:"#eee",
    },
    textColor:{
        color:'grey'
    }
});

export default buttonWithBackground;