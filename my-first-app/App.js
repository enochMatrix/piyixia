import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from './src/components/Listitem/Listitem';
import UserInput from './src/components/UserInput/UserInput';
import PlaceOutput from './src/components/PlaceOutput/PlaceOutput';
import placeImage from './src/assets/cats.jpg'; // local image
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';
import {connect} from 'react-redux';
import {addPlace, deselectPlace, deletePlace, selectPlace} from './src/store/actions/index';

class App extends React.Component {
    // put in reduex store....
    // state = {
    //     places: [],
    //     selectPlace: null
    // };

// 输入处理函数

    placeAddedHandler = (placeName) => {
        // concat all the inputs by user in a array, ['','','',...]
        // this.setState(prevState => {
        //     return {
        //         places: prevState.places.concat({
        //             key: Math.random(),
        //             name: placeName,
        //             image: {
        //                 // fetch image from online
        //                 uri: "https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
        //             }
        //         })
        //     }
        // })
        this.props.onAddPlace(placeName);
    };

    placeSelectedHandler = key => {

        // this.setState(prevState => {
        //     return {
        //         selectPlace: prevState.places.find(place => place.key === key)
        //     }
        // })
        this.props.onSelectPlace(key);
    };

    placeDeletedHandler = () => {
        // this.setState(prevState => {
        //     return {
        //         places: prevState.places.filter( place => {
        //             return place.key !== prevState.selectPlace.key
        //         }),
        //         selectPlace: null
        //     }
        // })
        this.props.onDeletePlace();
    };

    modalClosedHandler = () => {
        // this.setState({
        //     selectPlace: null
        // })
        this.props.onDeSelectPlace();
    };

  render() {
      // output the user's input
      // const placesOutput = this.state.places.map((place,i) => (
      //     <ListItem key={i} placeName={place}/>
      // ));

    return (
      <View style={styles.container}>
          {/*文本输入框*/}

          <PlaceDetail selectedPlace={this.props.selectPlace}
                       onItemDeleted={this.placeDeletedHandler}
                       onModalClosed={this.modalClosedHandler}/>
          <UserInput onPlaceAdded={this.placeAddedHandler}/>
          <PlaceOutput
             places={this.props.places}
             onItemSelected={this.placeSelectedHandler}/>
      </View>
    );
  }
}

// inline 样式
const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 26,
      backgroundColor: '#fff',
      // flexDirection: "row",
      alignItems: 'flex-start',         //cross axis beginning
      justifyContent: 'flex-start',// main axis beginning
  },
    inputContainer: {
        //flex:1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    placeInput: {
      width: "70%"
      //   flex:7
    },
    placeButton: {
      width: "30%"
      //   flex:3
    },
    listContainer: {
      width: "100%"
    }
});

const mapStateToProps = state => {
    return {
        places: state.places.places,
        selectPlace: state.places.selectPlace
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (name) => dispatch(addPlace(name)),
        onSelectPlace: (key) => dispatch(selectPlace(key)),
        onDeletePlace: () => dispatch(deletePlace()),
        onDeSelectPlace: () => dispatch(deselectPlace()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);