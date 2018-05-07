import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import ListItem from './src/components/ListItem/ListItem';
import InputPlace from './src/components/InputPlace/InputPlace';
import List from './src/components/List/List';

export default class App extends Component {
    state ={
        placeName:'',
        places:[]
    };
    placeNameChangedHandler=event=>{
        this.setState({placeName:event})//设置状态
        // alert(event)

    };

    placeSubmitHandler=()=>{
        if(this.state.placeName.trim()===""){
            return
        }
        //trim:remove whitespace from both side
        this.setState(preState=>{
            return{
                places:preState.places.concat(preState.placeName)
                //concat: join arrays
            }
        })
    };

  render() {
        const placesOutput=this.state.places.map(
            (place,i)=>(
                <ListItem key={i}
                placeName={place}/>
            )
        );//output the array out;

    return (
      <View style={styles.container}>

          <InputPlace ChangeText={this.placeNameChangedHandler}
                      Press={this.placeSubmitHandler}/>


          <List placesOutput={placesOutput}/>

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
