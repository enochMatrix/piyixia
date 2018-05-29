import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";
import MapView from 'react-native-maps';

class PlaceDetail extends Component {

    state = {
        listDirection: 'portrait',
        focusedLocation: {
            latitude: this.props.focusedLocation.latitude,
            longitude: this.props.focusedLocation.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
        },
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }

    updateStyles = dims => {
        this.setState({
            listDirection: dims.window.height > 500 ? 'portrait': 'landscape'
        })
    };

    placeDeletedHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key);
        this.props.navigator.pop();
    };

    componentWillUnmount () {
        Dimensions.removeEventListener("change", this.updateStyles)
    }

    render() {
        return (
            <View style={[styles.Container,
            this.state.listDirection === 'portrait'
                ? styles.portraitContainer
                : styles.landscapeContainer ]}>
                <View style={styles.subContainer}>
                    <Image source={this.props.selectedPlace.image} style={styles.placeImage} />
                </View>
                <View style={styles.subContainer}>
                    <MapView region={this.state.focusedLocation}
                              style={styles.map}>
                        <MapView.Marker coordinate={this.state.focusedLocation}/>
                    </MapView>
                    <View>
                        <Text style={styles.placeName}>{this.props.selectedPlace.name}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeletedHandler}>
                            <View style={styles.deleteButton}>
                                <Icon size={30} name={Platform.OS === 'android'?"md-trash":"ios-trash"} color="red" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        margin: 22
    },
    subContainer: {
        flex:1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
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
        alignItems: "center"
    },
    map: {
        width: "100%",
        height: 200
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onDeletePlace: key => dispatch(deletePlace(key))
    };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);
