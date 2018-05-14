import React from 'react';
import {Modal, View, Text, Image, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const placeDetail = props => {

    let modelContent = null;

    if(props.selectedPlace) {

        modelContent = (
            <View>
                <Image source={props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        )}

    return (
        <Modal visible={props.selectedPlace !== null}
               animationType="slide"
               onRequestClose={props.onModalClosed}>
            <View style={styles.modalContainer}>
            {modelContent}
            <View>
                <TouchableOpacity onPress={props.onItemDeleted}>
                    <View style={styles.deleteButton}>
                        //Add 3rd party Icon library
                    <Icon size={30} name="ios-trash" color="red"/>
                    </View>
                </TouchableOpacity>
                <Button title="Close" onPress={props.onModalClosed}/>
            </View>
            </View>
        </Modal>

)};

const styles=StyleSheet.create({
    modalContainer: {
        margin: 22,
    },
    placeImage: {
        width: "100%",
        height: 200
    },
    placeName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    deleteButton: {
        alignItems:"center"
    }

});

export default placeDetail;