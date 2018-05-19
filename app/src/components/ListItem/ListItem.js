import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';

const listItem =(props)=>(
    <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem} >
        <Image  source={props.placeImage} style={styles.placeImage} resizeMode="cover"/>
        <Text>
            {props.placeName}
        </Text>
    </View>
    </TouchableOpacity>
);
//view not have property of onPress, wrap it with TouchableHighlight

const styles= StyleSheet.create({
    listItem:{
        width:"100%",
        padding:10,
        margin:10,
        backgroundColor:"#eee",
        flexDirection:'row',
        alignItems:'center',

    },
    placeImage:{
        marginRight:8,
        height:100,
        width:100,
    }


});
export default listItem;