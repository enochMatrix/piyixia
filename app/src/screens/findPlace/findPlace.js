import React ,{Component} from 'react';
import {View, Text} from 'react-native';
import { connect} from 'react-redux';
import List from '../../components/List/List';

class findPlaceScreen extends Component{

    constructor(props){
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent =event=>{
        console.log(event);
        if(event.type==="NavBarButtonPress"){
            if(event.id==="sideDrawerToggle"){
                this.props.navigator.toggleDrawer({
                    side:'left'
                })
            }
        }
    }//combine the button and sideDrawer

    ItemSelectedHandler =key=>{
        const selectedPlace= this.props.places.find(place=>{
            return place.key===key
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
    render(){
        return(
            <View>
                <List places={this.props.places}
                      onItemSelected={this.ItemSelectedHandler}/>
            </View>
        )

    }
}
const mapStateToProps = state => {
    return {
        places: state.places.places,
        // selectPlace: state.places.selectPlace
    };
};

export default connect(mapStateToProps)(findPlaceScreen);