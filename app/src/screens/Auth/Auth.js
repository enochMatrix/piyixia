import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput , ImageBackground} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import startMainTabs from '../MainTabs/startMainTabs';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/beautiful-place.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';


class AuthScreen extends Component {

    loginHandler = () => {
        startMainTabs();
    };

    render () {
        return (
                // add background image
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <View style={styles.container}>
                <MainText>
                <HeadingText style={styles.textHeading}>Please Log In!</HeadingText>
                </MainText>
                        <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>Switch to LogIn!</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Your Email" style={styles.input}/>
                    <DefaultInput placeholder="Your Password" style={[styles.input, {borderColor: "red"}]}/>
                    <DefaultInput placeholder="Confirm Password" style={styles.input}/>
                </View>
                        <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>Submit</ButtonWithBackground>
                    </View>
                </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // borderColor: "red",
        // borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    textHeading: {
        color: "black"
    },
    input: {
        backgroundColor: "#eee",
        borderColor: "#bbb"
    },
    backgroundImage: {
        width: "100%",
        flex:1
    }
    });

export default AuthScreen;