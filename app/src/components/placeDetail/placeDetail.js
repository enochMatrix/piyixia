import  React from 'react';
import {StyleSheet, Modal, View, Image, Text, Button} from 'react-native';

const placeDetail =props=>{

    let imageText =null;

    if(props.selectedPlace){

        imageText=(
            <View>
            <Image source={props.selectedPlace.image} style={styles.image}/>
            <Text style={styles.placeName}>{props.selectedPlace.name}</Text>
            </View>
        )
    }

    return(
            <Modal
                onRequestClose={props.onModelClosed}
                visible={props.selectedPlace !==null}
                animationType="slide">
                <View style={styles.imageText}>
                    {imageText}
                        <View>
                            <Button title="Delete" color="red" onPress={props.onItemDeleted}/>
                            <Button title="Close" color="blue" onPress={props.onModelClosed}/>
                        </View>
                </View>
            </Modal>
        )

};
const styles = StyleSheet.create({
    imageText: {

        margin: 22
    },
    image:{
        height:200,
        width:'100%'
    },
    placeName:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:"center"
    }

});




export default placeDetail;