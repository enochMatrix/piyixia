import React, {Component} from 'react';
import {View, Button, Text, StyleSheet} from 'react-native';

class PickMap extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text>Map</Text>
                </View>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={() => alert('Pick Map!')}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center"
    },
    placeholder: {
        borderWidth:1,
        borderColor: 'black',
        backgroundColor: '#eee',
        margin: 8,
        width: "80%",
        height: 150
    },
    button: {
        margin:8
    }
});

export default PickMap