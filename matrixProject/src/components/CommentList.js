// For challenge comment

import React, {Component} from 'react';
import {ScrollView, Text, FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import ListItem from './common/ListItem';
import comments from './comment';
import CommentForChallenge from './common/CommentForChallenge';

class CommentList extends Component {

    state = {
        commentInput: false,
        mask: false,
    };

    render() {
        return (
            <ScrollView>
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
                {this.state.mask &&  // Mask is when comment box open, darken the background
                <TouchableWithoutFeedback
                    onPressIn={() => {
                        this.setState({ mask: !this.state.mask, commentInput: false });
                    }}>
                    <View style={styles.maskStyle} />
                </TouchableWithoutFeedback>
                }
                <CommentForChallenge input={this.state.commentInput}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 200,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        alignItems: 'center'
    },
    listContainer: {
        width: "100%"
    },
    maskStyle: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        right: 0,
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.8)'
    }
});


export default CommentList;