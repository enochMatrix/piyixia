import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlaceOutput from '../../components/PlaceOutput/PlaceOutput';


class FindPlaceScreen extends Component {

    render () {
        return (
            <View>
                <PlaceOutput places={this.props.places}/>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
};

export default connect(mapStateToProps)(FindPlaceScreen);