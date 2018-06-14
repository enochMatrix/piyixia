import React, { Component } from 'react';
import { View, Button, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/actions/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickMap from '../../components/PickMap/PickMap';
import validate from '../../utility/validation';


class SharePlaceScreen extends Component {

    // add color to nav button

    static navigatorStyle = {
        navBarButtonColor: "orange"
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentWillMount() {
        this.reset();
    }

    onNavigatorEvent = event => {

        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    placeAddedHandler = () => {
            this.props.onAddPlace(
                this.state.placeName,
                this.state.location.value,
                this.state.image.value);
            this.reset();
    };

    placeNameChangedHandler = val => {
        const rules = this.state.validationRules;

        this.setState({
                placeName: val,
                valid: validate(val,rules),
                touched: true
        });
    };

    locationPickedHandler = location => {
      this.setState(prevState => {
          return {
              ...prevState,
              location: {
                  value: location,
                  valid: true
              }
          }

      })
    };

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                ...prevState,
                image: {
                    value: image,
                    valid: true
                }
            }
        });
    };

    reset = () => {
        this.setState({
            placeName: "",
            validationRules: {
                isEmpty: true
            },
            valid: false,
            touched: false,
            location: {
                value: null,
                valid: false

            },
            image: {
                value: null,
                valid: false
            }
        })
    };


    render () {
        let submitButton =  <Button title="Share the place!"
                                    onPress={this.placeAddedHandler}
                                    disabled={!this.state.valid || !this.state.location.valid || !this.state.image.valid}
        />;
        if(this.props.isLoading) {
            submitButton = <ActivityIndicator/>;
        }
        return (
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePick={this.imagePickedHandler}/>
                    <PickMap onLocationPick={this.locationPickedHandler}/>
                    <PlaceInput placeName={this.state.placeName}
                                onChangeText={this.placeNameChangedHandler}
                                touched={this.state.touched}
                                valid={this.state.valid}/>
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
    },
});

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

const mapStateToProps = state => {
    return {
       isLoading: state.ui.isLoading
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);