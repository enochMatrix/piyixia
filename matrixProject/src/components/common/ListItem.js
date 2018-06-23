// For CommentList.js single comment

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

const ListItem = props => (
    <TouchableOpacity onPress={() => {}}>
        <View style={styles.listItem}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
        <Image resizeMode="cover" source={{uri: props.userIcon}} style={styles.userIcon}/>
            <Text style={styles.userName}>
                {props.userName}
            </Text>
            </View>
            <Text style={styles.content}>
                {props.content}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        width: "100%",

        padding: 20,
        backgroundColor: "#eee",
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    userIcon: {
        marginRight: 8,
        height: 30,
        width: 30
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 10,
    }
});

export default ListItem;
