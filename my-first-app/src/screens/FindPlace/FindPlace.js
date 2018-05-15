import React, {Component} from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlaceOutput from '../../components/PlaceOutput/PlaceOutput';
import {deletePlace} from '../../store/actions/index';

class FindPlaceScreen extends Component {

    itemSelectHandler = key => {
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: this.props.places.find( place => {
                return place.key === key;
            }).name,
            passProps: {
                selectedPlace: this.props.places.find( place => {
                    return place.key === key;
                })
            }

        });
    };

    render () {
        return (
            <View>
                <PlaceOutput places={this.props.places}
                             onItemSelected={this.itemSelectHandler} />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
};

// const mapDispatchToProps = dispatch => {
//     return {
//         OnItemDeleted: dispatch(deletePlace)
//     }
// };

export default connect(mapStateToProps)(FindPlaceScreen);