import React,{Component} from 'react';
import {View, Text,Button,TextInput,StyleSheet,ImageBackground, Dimensions} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../asset/1.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';



class AuthScreen extends Component {
    state = {
        styles: {
            pwContainerDirection: 'column',
            pwContainerJustifyContent: 'flex-start',
            pwWidth: '100%'
        }
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', dims => {
            console.log(dims);
            this.setState({
                styles: {
                    pwContainerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 ? 'flex-start' : 'space-between',
                    pwWidth: Dimensions.get('window').height > 500 ? '100%' : '45%'
                }
            })
        })

    }
    //动态监听屏幕旋转的状况。

    componentWillUnmount() {
        Dimensions.removeEventListener('change', dims => {
            console.log(dims);
            this.setState({
                styles: {
                    pwContainerDirection: Dimensions.get('window').height > 500 ? 'column' : 'row',
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 ? 'flex-start' : 'space-between',
                    pwWidth: Dimensions.get('window').height > 500 ? '100%' : '45%'
                }
            })
        })
    }
    //unmount




    loginHandler = () => {
        startMainTabs()
    };

    render() {
        let headingText = null;
        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText style={styles.textHeading}>Please Log in</HeadingText>
                </MainText>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    {headingText}
                    <ButtonWithBackground color="#29aaf4"
                                          onpress={() => alert("hello")}>Switch to Login</ButtonWithBackground>

                    <View style={styles.inputContainer}>

                        <DefaultInput placeholder="Your E-mail Adress"
                                      style={[styles.input, {borderColor: "red"}]}/>

                        <View style={{
                            flexDirection: this.state.styles.pwContainerDirection,
                            justifyContent: this.state.styles.pwContainerJustifyContent
                        }}>

                            <View style={{
                                width: this.state.styles.pwWidth
                            }}>
                                <DefaultInput placeholder="Password"/>
                            </View>
                            <View style={{
                                width: this.state.styles.pwWidth
                            }}>
                                <DefaultInput placeholder="Confirm Password"/>
                            </View>

                        </View>
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
        width:"80%",

    },
    input:{
        backgroundColor:"pink"
    },
    // email:{
    //     alignItems:'center',
    //     width:'100%'
    //
    // },
    backgroundImage:{
        width:"100%",
        flex:1
    },
    // passWordContainer:{
    //     flexDirection:Dimensions.get('window').height>500?'column':'row',
    //     justifyContent:'space-between'
    //
    // },
    // passWordWidth:{
    //     width:Dimensions.get('window').height>500?'100%':'45%',
    //
    // }



});

export default AuthScreen;