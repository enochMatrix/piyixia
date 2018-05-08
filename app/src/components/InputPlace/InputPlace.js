import React,{Component} from 'react';
import {View,TextInput,StyleSheet,Button} from 'react-native';

class inputPlace extends Component{
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
        this.props.onPlaceAdded(this.state.placeName);
    };
    render(){
        return(
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    // style={{width:300}}
                    //inline  style
                    placeholder="majingyi"
                    // value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler} //the same as React.
                />
                <Button title="Add"
                        style={styles.placeButton}
                        onPress={this.placeSubmitHandler}/>

            </View>

        )
    }
    };
const styles = StyleSheet.create({
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

    }

});
export default inputPlace;

