import React from 'react';
import {View,Text,StyleSheet,TouchableHighlight,Image} from 'react-native';
const listItem =(props)=>(
    <TouchableHighlight onPress={props.onItemPressed}>
    <View style={styles.listItem} >
        <Image   resizeMode="cover" source={props.placeImage}
                style={styles.placeImage}/>
        <Text>
            {props.placeName}
        </Text>
    </View>
    </TouchableHighlight>//view not have property of onPress, wrap it with TouchableHighlight
);

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
        height:90,
        width:90
    }


});
export default listItem;