import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

class SideDrawer extends Component {
    render() {
        return (
            <View
                style={[
                    styles.container,
                    { width: Dimensions.get("window").width * 0.8 }
                ]}
            >
                <Text>SideDrawer</Text>
            </View>
        );
    }
}
//does not only create js object , it validated the styles and sends them to native code more efficiently
// use whenever you can!
// only Image, ScrollView, Text and View can be applied styles.
const styles = StyleSheet.create({
    container: {
        paddingTop: 22,
        backgroundColor: "white",
        flex: 1
    }
});

export default SideDrawer;
