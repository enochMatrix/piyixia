import React from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

const userInput = (props) => {

    const styles = StyleSheet.create({
        inputContainer: {
            //flex:1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
        },
        placeInput: {
            width: "70%"
            //   flex:7
        },
        placeButton: {
            width: "30%"
            //   flex:3
        },
    });

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.placeInput}
                placeholder='Your Name'
                value={props.placeName}
                onChangeText={props.changed}/>
            <Button style={styles.placeButton}
                    title="Add"
                    onPress={props.submitted}/>
        </View>
    )
};

export default userInput;