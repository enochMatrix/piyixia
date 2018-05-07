import React from 'react';
import {View,TextInput,StyleSheet,Button} from 'react-native';

const inputPlace = (props) => {

    return(

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    // style={{width:300}}
                    //inline  style
                    placeholder="majingyi"
                    // value={this.state.placeName}
                    onChangeText={props.ChangeText} //the same as React.
                />
                <Button title="Add"
                        style={styles.placeButton}
                        onPress={props.Press}/>

            </View>)

            };
const styles = StyleSheet.create({
    inputContainer:{
        // flex:1,
        flexDirection:"row",
        justifyContent: 'space-between',//main axis
        alignItems:"center"//cross axis

    },
    placeInput:{
        flex:7,
        flexDirection:"row"


    },
    placeButton:{
        flex:3,
        flexDirection:"row"

    }

});
export default inputPlace;

