import  React from 'react';
import {StyleSheet, Modal, View, Image, Text, Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';//add a 3rd party icon from react-native-vector-icons/Ionicons
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
                onRequestClose={props.onModalClosed}
                visible={props.selectedPlace !==null}
                animationType="slide">
                <View style={styles.imageText}>
                    {imageText}
                        <View>
                            <TouchableOpacity onPress={props.onItemDeleted}>
                                <View style={styles.deleteButton}>
                                    <Icon size={30} name="ios-trash" color="red"/>
                                    // we can find the icon name, size, and color from official ducumentary
                                </View>
                            </TouchableOpacity>//add TouchableOpacity to add onPress method
                            {/*<Button title="Delete" color="red" onPress={props.onItemDeleted}/>*/}
                            <Button title="Close" color="blue" onPress={props.onModalClosed}/>
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
        height:300,
        width:'100%'
    },
    placeName:{
        fontSize:28,
        fontWeight:'bold',
        textAlign:"center"
    },
    deleteButton:{
        alignItems:"center"
    }

});




export default placeDetail;