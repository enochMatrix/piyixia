import React ,{Component} from 'react';
import {View,Text, TouchableOpacity, StyleSheet, Animated} from 'react-native';
import { connect} from 'react-redux';
import List from '../../components/List/List';
import {setPlaces} from "../../store/actions/places";
import {getPlaces} from "../../store/actions/index";

class findPlaceScreen extends Component{
    static navigatorStyle ={
        navBarButtonColor:"orange"
    }

    state={
        placeLoaded: false,
        removeAnim: new Animated.Value(1),
        addAnim: new Animated.Value(0)

    };

    constructor(props){

        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event =>{

        console.log(event);
        if(event.type === "NavBarButtonPress"){
            if(event.id === "sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:'left'
                })
            }
        }
    };
    //combine the button and sideDrawer
    componentDidMount(){
    this.props.getPlaces();
    }

    ItemSelectedHandler =key=>{
        const selectedPlace = this.props.places.find(place=>{
            return place.key === key
        });
        this.props.navigator.push(
            {
                screen:'awesome-places.PlaceDetailScreen',
                title:selectedPlace.name,
                passProps:{
                    selectedPlace: selectedPlace
                }
            }
        )
    };

    placeLoadedHandler =()=>{
        Animated.timing(this.state.addAnim,{
            toValue:1,
            duration:2000,
            useNativeDriver: true
        }).start()
    };

    placeSearchHandler=()=>{
        Animated.timing(this.state.removeAnim,{
            toValue:0,
            duration:500,
            useNativeDriver: true
        }).start(()=>{
            this.setState({
                placeLoaded: true
            });
            this.placeLoadedHandler();
        });
    };
    //把变化的 removeAnim 值传给state


    render(){
        let content = (
            <Animated.View
                style={{
                    opacity:this.state.removeAnim,
                transform:[
                    {
                        scale:this.state.removeAnim.interpolate({
                            inputRange:[0,1],
                            outputRange:[12,1]

                        })
                    }
                ]}}>

            <TouchableOpacity onPress={this.placeSearchHandler}>
                <View style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>
                        Find Places
                    </Text>
                </View>
            </TouchableOpacity>
            </Animated.View>
        );

        if(this.state.placeLoaded){
            content=(
                <Animated.View
                    style={{
                        opacity:this.state.addAnim}}>
                    <List
                        places={this.props.places}
                        onItemSelected={this.ItemSelectedHandler}/>
                </Animated.View>
            )
        }

        return(
            <View style={this.state.placeLoaded?null:styles.buttonContainer}>
            {content}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places,


    };
};
const mapDispatchToProps =dispatch =>{
    return{
        getPlaces: () => dispatch(getPlaces()),
    }

};

const styles= StyleSheet.create({
    searchButton:{
        borderColor:'orange',
        borderWidth:3,
        borderRadius:50,
        padding:20
    },
    searchButtonText:{
        color:'orange',
        fontWeight:'bold',
        fontSize:26

    },
    buttonContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:'center'
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(findPlaceScreen);