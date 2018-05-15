import React, {Component} from 'react';
import {View} from 'react-native';
import UserInput from '../../components/UserInput/UserInput';
import { connect } from 'react-redux';
import {addPlace} from "../../store/actions";

class SharePlaceScreen extends Component {

    placeAddedHandler = (placeName) => {
        this.props.AddPlace(placeName)
    };

    render () {
        return (
            <View>
                <UserInput onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        AddPlace: (placeName) => dispatch(addPlace(placeName))
    }
};

export default connect(null,mapDispatchToProps)(SharePlaceScreen);