import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class JoinedChallenge extends Component {

    state = {

    };

    render () {
        return (
            <View style={{flex: 1}}>
                <View style={styles.header}>
                    <Button title="Create (19)" onPress={}/>
                    <Button title="Sponsored (13)" onPress={}/>
                </View>
            </View>
        )}
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    }
});

export default JoinedChallenge;