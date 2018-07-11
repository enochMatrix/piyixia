import React, {Component} from 'react';
import {Card, CardTitle, CardContent, CardAction, CardButton, CardImage} from 'react-native-cards';
import {ScrollView, View, StyleSheet, Text, Image, Button} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons';

class MatrixDetail extends Component {

    render() {
        const content = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravidaLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan.";
        const date = "Create by Kwan at 2017-02-09 12:22";
        return (
            <View style={styles.container}>
                <ScrollView >
                    <Text style={{fontSize: 24, margin: 10}}>
                        IceBucket Challenge
                    </Text>
                    <Image style={{width: "100%", height: 200}}
                           resizeMode="cover"
                           source={{uri: 'http://bit.ly/2GfzooV'}}/>
                    <Text style={{margin: 10}}>
                        {date}
                    </Text>
                    <Text style={{fontSize: 18, margin: 15}}>
                        {content}
                    </Text>
                    <View style={{alignItems: "center"}}>
                        <ProgressBar progress={0.3}
                                     width={300}
                                     animated
                                     animationType="timing"/>
                        <Text>
                            30%
                        </Text>
                    </View>
                    <Text style={{fontSize: 24, marginTop: 10}}>
                        Comment
                    </Text>
                    <Text style={{fontSize: 18, margin: 15}}>
                        {content}
                    </Text>
                    <Text style={{fontSize: 18, margin: 15}}>
                        {content}
                    </Text>
                </ScrollView>
                <View style={styles.foot}>
                    <View>
                        <Text style={{fontSize: 30}}>
                            Pledged: 10K
                        </Text>
                    </View>
                    <View>
                        <Button
                            title="Sponsor Now!"
                            color="green"
                            onPress={() => {}}/>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    title: {
        marginBottom: 5,
    },
    foot: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#eee",
        justifyContent: "space-between",
        alignItems: "center"
    }
});


export default MatrixDetail;
