// For challenge comment

import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import ListItem from './common/ListItem';
import comments from './comment';

// const comments = [
//     {name: 'Stan', icon: "uri: 'https://cdn.pixabay.com/photo/2016/06/18/17/42/image-1465348_960_720.jpg'", content: 'Lorem ipsum dolor sit amet'},
//     {name: 'Enoch', icon: "uri: 'https://www.wonderplugin.com/videos/demo-image0.jpg'", content: 'Lorem ipsum dolor sit amet'},
//     {name: 'Echo', icon: "uri: 'https://www.codeproject.com/KB/GDI-plus/ImageProcessing2/img.jpg'", content: 'Lorem ipsum dolor sit amet'},
//     {name: 'Yuxin', icon: "uri: 'http://legacy.semantic-ui.com/images/demo/photo.jpg'", content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin s'},
// ];

class CommentList extends Component {

    render() {
        console.log(comments.data);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Comment(1.2k)
                </Text>
                <FlatList
                style={styles.listContainer}
                data={comments.data}
                renderItem={(info) => (
                    <ListItem
                    userName={info.item.name}
                    userIcon={info.item.icon}
                    content={info.item.comment}
                    key={info.item.name}/>
                )}/>
                <Text>
                    No more comments
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        alignItems: 'center'
    },
    listContainer: {
        width: "100%"
    },
});


export default CommentList;