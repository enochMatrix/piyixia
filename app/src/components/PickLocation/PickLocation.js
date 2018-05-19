import React, {Component} from 'react';
import {View, Button, Text} from 'react-native';
import PickImage from "../PickImage/PickImage";
import {StyleSheet} from "react-native";

class PickLocation extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Text>map</Text>
                </View>
                <View style={styles.button}>
                    <Button title="locate me" onPress={()=>{alert(
                        "Pick Location!"
                    )}}/>
                </View>
            </View>
        );
    }


}
const styles= StyleSheet.create({
    container:{
      width:"100%",
      alignItems:"center"
    },
    placeholder:{
        borderWidth:1,
        borderColor: 'black',
        backgroundColor:'#eee',
        margin:5,
        width:"80%",
        height: 150
    },
    button:{
        margin: 8
    }
});

export default PickLocation;
