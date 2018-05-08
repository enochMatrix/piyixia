import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

class UserInput extends Component {
    state = {
        placeName: ""
    };

    placeNameChangedHandler = val => {
        this.setState({placeName: val})
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {  // trim remove whitespace from both sides of string
            return;
        }
        this.props.onPlaceAdded(this.state.placeName);
    };

    render () {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    placeholder='Your Name'
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}/>
                <Button style={styles.placeButton}
                        title="Add"
                        onPress={this.placeSubmitHandler}/>
            </View>
        )
    }
}

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

export default UserInput;