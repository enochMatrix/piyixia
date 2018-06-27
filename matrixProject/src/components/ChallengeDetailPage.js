import React, {Component} from 'react';
import {ScrollView, View, StyleSheet, Text, Image, Button, TouchableOpacity, Modal, TouchableHighlight} from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import DiamondControls from './common/DiamondControls';
import Icon from 'react-native-vector-icons/Ionicons';
class MatrixDetail extends Component {

    state = {
        modalVisible: false,
        conModalVisible: false,
    };

    commentHandler = () => {
        this.props.navigation.navigate('CommentList')
    };

    sponsorHandler = (visible) => {
        this.setState({modalVisible: visible});
        this.confirmModalHandler(!visible);
    };

    confirmModalHandler = (visible) => {
        this.setState({conModalVisible: visible})
    };


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
                    <TouchableOpacity onPress={this.commentHandler}>
                    <Text style={{fontSize: 24, marginTop: 10}}>
                        Comment
                    </Text>
                    </TouchableOpacity>
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
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.conModalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={{flex: 1, top: '60%', borderRadius:12 ,backgroundColor: 'rgba(255,255,255, 0.9)', padding: 30}}>
                            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Balance: 443234                        <Icon name='md-close' size={30}/></Text>
                            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Do you confirm the sponsorship?</Text>
                            <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}><Icon name='ios-star' size={40}/>  1600</Text>
                            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                                <Button title='back' onPress={() => {}} color='green'/>
                                <Button title="Confirm" color='green' onPress={() => this.confirmModalHandler(!this.state.conModalVisible)} />
                            </View>
                            </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>
                        <View style={{flex: 1, top: '53%', borderRadius:12 ,backgroundColor: 'rgba(255,255,255, 0.9)'}}>
                            <DiamondControls close={() => {
                                this.sponsorHandler(!this.state.modalVisible);
                            }}/>
                        </View>
                    </Modal>
                    <View>
                        <Button
                            title="Sponsor Now!"
                            color="green"
                            onPress={ () => this.sponsorHandler(true)}/>
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