import React, {Component} from 'react';
import {View, Button, Text,Dimensions} from 'react-native';
import PickImage from "../PickImage/PickImage";
import {StyleSheet} from "react-native";
import MapView from 'react-native-maps';

class PickLocation extends Component{

    state = {
        focusedLocation: {
            latitude: 37.7900352,
            longitude: -122.4013726,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
        locationChosen: false // add marker on location
    };

    pickLocationHandler = event => {
        const coords = event.nativeEvent.coordinate;
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        },500); // add animation for map
        this.setState( prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                locationChosen: true
            }
        });
        this.props.onLocationPick(coords);

    };

    getLocationHandler = () => {
// get the current position of the device.
        navigator.geolocation.getCurrentPosition(pos => {
                const coordsEvent = {
                    nativeEvent: {
                        coordinate: {
                            latitude: pos.coords.latitude,
                            longitude: pos.coords.longitude
                        }
                    }
                };
                console.log(coordsEvent.nativeEvent.coordinate);

                this.pickLocationHandler(coordsEvent);
                this.props.onLocationPick(coordsEvent.nativeEvent.coordinate);

            },

            err => {
                //console.log(err);
                alert('Fetching the Position failed, please pick one manually!');
            })

    };

    render(){
        let marker = null;

        if(this.state.locationChosen) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation}/>
        }

        return(
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    style={styles.map}
                    onPress={(event)=>this.pickLocationHandler(event)}
                    ref={ref => this.map = ref }>
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <Button title="Locate me" onPress={this.getLocationHandler}/>
                </View>
            </View>
        )
    }
}





const styles= StyleSheet.create({
    container:{
      width:"100%",
      alignItems:"center"
    },
    map: {

        width: "100%",
        height: 250
    },

    button:{
        margin: 8
    }
});

export default PickLocation;
