import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import ListItem from './src/components/Listitem/Listitem';
import UserInput from './src/components/UserInput/UserInput';
import PlaceOutput from './src/components/PlaceOutput/PlaceOutput';
import placeImage from './src/assets/cats.jpg'; // local image
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail';

export default class App extends React.Component {

    state = {
        places: [],
        selectPlace: null
    };

// 输入处理函数

    placeAddedHandler = (placeName) => {
        // concat all the inputs by user in a array, ['','','',...]
        this.setState(prevState => {
            return {
                places: prevState.places.concat({
                    key: Math.random(),
                    name: placeName,
                    image: {
                        // fetch image from online
                        uri: "https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
                    }
                })
            }
        })
    };

    placeSelectedHandler = key => {
        // this.setState(prevState => {
        //     return {
        //         places: prevState.places.filter( place => {
        //             return place.key !== key;
        //         })
        //     }
        // })
        this.setState(prevState => {
            return {
                selectPlace: prevState.places.find(place => place.key === key)
            }
        })
    };
    placeDeletedHandler = () => {
        this.setState(prevState => {
            return {
                places: prevState.places.filter( place => {
                    return place.key !== prevState.selectPlace.key
                }),
                selectPlace: null
            }
        })
    };

    modalClosedHandler = () => {
        this.setState({
            selectPlace: null
        })
    };

  render() {
      // output the user's input
      // const placesOutput = this.state.places.map((place,i) => (
      //     <ListItem key={i} placeName={place}/>
      // ));

    return (
      <View style={styles.container}>
          {/*文本输入框*/}

          <PlaceDetail selectedPlace={this.state.selectPlace}
                       onItemDeleted={this.placeDeletedHandler}
                       onModalClosed={this.modalClosedHandler}/>
          <UserInput onPlaceAdded={this.placeAddedHandler}/>
          <PlaceOutput
             places={this.state.places}
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
