import React ,{Component} from 'react';
import {View, Text} from 'react-native';
import PlaceInput from '../../components/InputPlace/InputPlace';
import {connect} from 'react-redux';
import {addPlace} from '../../store/actions/index';

 class sharePlaceScreen extends Component{
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
         // console.log(event);
     }//combine the button and sideDrawer

     placeAddedHandler = (placeName) => {
         this.props.onAddPlace(placeName);
     };

     render(){
         return(
             <View>
                 <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
             </View>
         )

     }
 }

 const mapDispatchToProps =dispatch =>{
    return{
        onAddPlace: (name) => dispatch(addPlace(name)),
    }

 };

 export default connect(null,mapDispatchToProps)(sharePlaceScreen);