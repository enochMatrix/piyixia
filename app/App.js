import React,{Component} from 'react';
import { StyleSheet, Text, View,TextInput,Button } from 'react-native';
import ListItem from './src/components/ListItem/ListItem';

export default class App extends Component {
    state ={
        placeName:'',
        places:[]
    }
    placeNameChangedHandler=event=>{
        this.setState({placeName:event})//设置状态
        // alert(event)

    }
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

    }

  render() {
        const placesOutput=this.state.places.map(
            (place,i)=>(
                <ListItem key={i}
                placeName={place}/>
            )
        );//output the array out;
    return (
      <View style={styles.container}>
          <View style={styles.inputContainer}>
              <TextInput
                  style={styles.placeInput}
                  // style={{width:300}}
                  //inline  style
                  placeholder="majingyi"
                  value={this.state.placeName}
                  onChangeText={this.placeNameChangedHandler} //the same as React.
              />
              <Button title="Add"
                      style={styles.placeButton}
              onPress={this.placeSubmitHandler}/>

          </View>
          <View style={styles.listContainer}>
              {placesOutput}
          </View>

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
  },
    inputContainer:{
        // flex:1,
        flexDirection:"row",
        justifyContent: 'space-between',//main axis
        alignItems:"center"//cross axis

    },
    placeInput:{
        flex:7,
        flexDirection:"row"


    },
    placeButton:{
        flex:3,
        flexDirection:"row"

    },
    listContainer:{
      width:"100%"
    }

});
