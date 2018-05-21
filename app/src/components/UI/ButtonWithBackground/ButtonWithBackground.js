import React from 'react';
import {TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    View,
    StyleSheet,
     Platform} from 'react-native';

const buttonWithBackground =props => {
    const Content=(<View style={[styles.button, {backgroundColor: props.color}]}>
        <Text>{props.children}</Text>
    </View>);
    //content is the same, deffirent method of touch

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
    }
})

export default buttonWithBackground;