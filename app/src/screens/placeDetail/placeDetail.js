import  React,{Component} from 'react';
import {StyleSheet, View, Image, Text, Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';//add a 3rd party icon from react-native-vector-icons/Ionicons
import {connect} from 'react-redux';
import {deletePlace} from "../../store/actions";

class placeDetail extends Component {

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop()
    };

    render(){

        return (
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedPlace.image} style={styles.image}/>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                </View>
                <View>
                    <TouchableOpacity onPress={this.placeDeleteHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="ios-trash" color="red"/>
                            // we can find the icon name, size, and color from official ducumentary
                        </View>
                    </TouchableOpacity>//add TouchableOpacity to add onPress method
                    {/*<Button title="Delete" color="red" onPress={props.onItemDeleted}/>*/}
                </View>
            </View>
        )
    }
};

const mapDispatchToProps =dispatch =>{
    return{
        onDeletePlace: (name) => dispatch(deletePlace(name)),
    }

};
const styles = StyleSheet.create({
    container: {

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




export default connect(null,mapDispatchToProps)(placeDetail);