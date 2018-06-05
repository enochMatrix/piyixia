import React, {Component} from 'react';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {View, StyleSheet, ProgressBarAndroid, Text, Image} from 'react-native';

class MatrixDetail extends Component {

    render() {
        const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan.";
        const date = "Create by Kwan at 2017-02-09 12:22";
        return (
            <View style={styles.container}>
                {/*<Text>*/}
                    {/*{content}*/}
                {/*</Text>*/}
                {/*<Image style={{width: "80%", height: 100}}*/}
                       {/*resizeMode="cover"*/}
                       {/*source={{uri: 'http://bit.ly/2GfzooV'}}/>*/}
                {/*<Text>*/}
                    {/*{date}*/}
                {/*</Text>*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center"
    },
    title: {
        margin: 10,
    }
});


export default MatrixDetail;