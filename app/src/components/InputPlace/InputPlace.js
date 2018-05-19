import React,{Component} from 'react';
import {View,TextInput,StyleSheet,Button} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';

const inputPlace = props=>{
        return(
            <DefaultInput placeholder="place name"
            onChangeText={props.onChangeText}
            value={props.placeName}/>
        )
    };

export default inputPlace;

