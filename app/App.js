import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import InputPlace from './src/components/InputPlace/InputPlace';
import List from './src/components/List/List';
// import placeImage from './src/asset/-93864268+539405686.jpg';
import PlaceDetail from './src/components/placeDetail/placeDetail';

export default class App extends Component {
    state={
        places:[],
        selectedPlace:null
    };


   placeAddedHandler=placeName=>{
    this.setState(pre=>{
        return{
            places:pre.places.concat({
                key:Math.random(),
                name:placeName,
                image:{
                    uri:"https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/lasvegas/strip_b86ddbea-3add-4995-b449-ac85d700b027.jpg"
                }})
        }
        }
    )};
    placeDeletedHandler=()=>{
        this.setState(preState=>{
            return{
                places:preState.places.filter((place)=>
                {return place.key!==preState.selectedPlace.key}) ,
                //filter==true ,keep the value
                selectedPlace:null
            }
        })
    }

    modelClosedHandler=()=>(
        this.setState({
            selectedPlace:null

        })
    )

    placeSelectedHander=key=>{
        this.setState(preState=>{
            return {
                selectedPlace:preState.places.find(place=>{
                    return place.key===key;
                })
            }
        })
    }





  render() {


    return (
      <View style={styles.container}>


          <InputPlace onPlaceAdded={this.placeAddedHandler}/>


          <List places={this.state.places}
                onItemSelected={this.placeSelectedHander}/>

          <PlaceDetail selectedPlace={this.state.selectedPlace}
                       onItemDeleted={this.placeDeletedHandler}
                       onModelClosed={this.modelClosedHandler}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      // 默认coclumn方向占满整个屏幕
      padding:26,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',// default columnflex
      justifyContent: 'flex-start'//move the TextInput to top,main axis
  }

});
