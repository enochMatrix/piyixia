import React,{Component} from 'react';
import {View, Text,Button,TextInput,StyleSheet,ImageBackground} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../asset/1.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';


class AuthScreen extends Component{

    loginHandler=()=>{
        startMainTabs()
    };

    render(){
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundImage} >
            <View style={styles.container}>
                <MainText>
                <HeadingText style={styles.textHeading}>Please Log in</HeadingText>
                </MainText>

                <ButtonWithBackground color="#29aaf4"
                onpress={()=>alert("hello")}>Switch to Login</ButtonWithBackground>

                <View style={styles.inputContainer}>
                <DefaultInput placeholder="Your E-mail Adress"
                              style={[styles.input,{borderColor:"red"}]}/>
                <DefaultInput placeholder="Password"/>
                <DefaultInput placeholder="Confirm Password"/>
                </View>

                <ButtonWithBackground color="#29aaf4"
                onpress={this.loginHandler}>Submit</ButtonWithBackground>
            </View>
            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    //the advantage of StyleSheet.create instead of Object
    //1. validate the style
    //2. transfer to native language more efficiently
    textHeading:{
        color:"pink"
    },
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    inputContainer:{
        width:"80%"
    },
    input:{
        backgroundColor:"pink"
    },
    backgroundImage:{
        width:"100%",
        flex:1
    }


});

export default AuthScreen;