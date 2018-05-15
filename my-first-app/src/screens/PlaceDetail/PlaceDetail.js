import React,{Component} from 'react';
import {View, Text, Image, Button, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {deletePlace} from "../../store/actions/index";

class PlaceDetail extends Component{

    onItemDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    render() {

        return (
        <View style={styles.modalContainer}>
            <View>
                <Image source={this.props.selectedPlace.image} style={styles.placeImage}/>
                <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={this.onItemDeletedHandler}>
                    <View style={styles.deleteButton}>
                        //Add 3rd party Icon library
                        <Icon size={30} name="ios-trash" color="red"/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        )
    }
}

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

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
};


export default connect(null,mapDispatchToProps)(PlaceDetail);