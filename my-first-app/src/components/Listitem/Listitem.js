import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const listItem = (props) => (
    // enable touchable function
    <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
        <Image style={styles.placeImage} source={props.placeImage} resizeMode="cover"/>
        <Text>{props.placeName}</Text>
    </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        padding: 10,
        margin: 5,
        backgroundColor: "#eee",
        flexDirection: "row",
        alignItems: "center"
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
});

export default listItem;