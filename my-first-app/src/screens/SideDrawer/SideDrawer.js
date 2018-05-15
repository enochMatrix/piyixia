import React, {Component} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
// Add SideDrawer

class SideDrawer extends Component {

    render () {
        return (
            // Dimension get the items dimensions
            <View style={[styles.container, {width: Dimensions.get("window").width * 0.8}]}>
                <Text>SideDrawer</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1
    }
});

export default SideDrawer;