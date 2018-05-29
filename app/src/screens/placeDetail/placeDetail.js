import  React,{Component} from 'react';
import {StyleSheet, View, Image, Text, Button,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';//add a 3rd party icon from react-native-vector-icons/Ionicons
import {connect} from 'react-redux';
import {deletePlace} from "../../store/actions";
import {Platform, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

class placeDetail extends Component {
    state={
        viewMode:"portrait"
    };

    constructor(props){
        super(props);
        Dimensions.addEventListener('change',this.updateStyles)
    }
    componentWillUnmount(){
        Dimensions.removeEventListener('change',this.updateStyles)
    }

    updateStyles=dims=>{
            console.log(dims);
            this.setState({
                viewMode: dims.window.height>500?'portrait':'landscape'
            })
    }

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop()
    };

    render(){

        return (
            <View style={[styles.container,
                this.state.viewMode==='portrait'
                    ?styles.portraitContainer
                    :styles.landscapeContainer]}>

                <View style={styles.subContainer}>
                    <Image source={this.props.selectedPlace.image} style={styles.image}/>
                </View>



                <View style={styles.subContainer} >
                    <View>
                    <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <MapView initialRegion={this.props.places.location}/>


                    <TouchableOpacity onPress={this.placeDeleteHandler}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name={Platform.OS==='android'?"md-trash":"ios-trash"} color="red"/>
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

const mapStateToProps = state => {
    return {
        places: state.places.places,
    };
};

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex:1
    },
    portraitContainer:{
        flexDirection:'column'
    },
    landscapeContainer:{
        flexDirection:'row'
    },
    subContainer:{
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




export default connect(mapStateToProps,mapDispatchToProps)(placeDetail);