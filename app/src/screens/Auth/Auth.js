import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import startMainTabs from '../MainTabs/startMainTabs';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/beautiful-place.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';

class AuthScreen extends Component {

    state = {
        styles: {
            pwContainerDirection: "column",
            pwContainerJustifyContent: "flex-start",
            pwWrapperWidth: "100%",
        },
        controls: {
                email: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmail: true
                    }
                },
                password:{
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 6
                    }
                },
                confirmPassword:{
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    }
                },
            }
    };

    // dynamically change the layout by rotating
    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", (dims) => {
            // console.log(dims);
            this.setState({
                styles: {
                    pwContainerDirection: Dimensions.get('window').height > 500 ? "column" :"row",
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 ? "flex-start":"space-between",
                    pwWrapperWidth: Dimensions.get('window').height > 500 ? "100%" : "45%",
                }
            })
        })
    }

// cleaning event listener in case of memory leak
    componentWillUnmount() {
        Dimensions.removeEventListener("change",(dims) => {
            // console.log(dims);
            this.setState({
                styles: {
                    pwContainerDirection: Dimensions.get('window').height > 500 ? "column" :"row",
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 ? "flex-start":"space-between",
                    pwWrapperWidth: Dimensions.get('window').height > 500 ? "100%" : "45%",
                }
            })
        })
    }
   // two way binding
    updateInputState = (key,value) => {
        //get password value and set in equalTo
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }

        if( key === 'password') {
            const equalControl = this.state.controls.confirmPassword.validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        // end
      this.setState(prevState => {
          return {
              controls: {
                  ...prevState.controls,
                  [key]: {
                      ...prevState.controls[key],
                      valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                      value: value
                  },
                  confirmPassword: {
                      ...prevState.controls.confirmPassword,
                      valid: key === 'password'
                          ? validate(prevState.controls.confirmPassword.value,
                              prevState.controls.confirmPassword.validationRules,
                              connectedValue)
                          : prevState.controls.confirmPassword.valid
                  },

              }
          }
      })
    };

// switch to tab based nav
    loginHandler = () => {
        startMainTabs();
    };

    render () {

        let headingText = null;

        if(Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText style={styles.textHeading}>Please Log In!</HeadingText>
                </MainText>
            )
        }
        return (
                // add background image
                <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                    <View style={styles.container}>
                        {headingText}
                        <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>Switch to LogIn!</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput
                        placeholder="Your Email"
                        style={styles.input}
                        value={this.state.controls.email.value}
                        onChangeText = { (val) => this.updateInputState('email',val)}/>
                    <View style={{flexDirection: this.state.styles.pwContainerDirection,
                                  justifyContent: this.state.styles.pwContainerJustifyContent,}}>
                        <View style={{width: this.state.styles.pwWrapperWidth}}>
                         <DefaultInput
                             placeholder="Your Password"
                             style={[styles.input, {borderColor: "red"}]}
                             value={this.state.controls.password.value}
                             onChangeText = { (val) => this.updateInputState('password',val)}/>
                        </View>
                        <View style={{width: this.state.styles.pwWrapperWidth}}>
                         <DefaultInput
                             placeholder="Confirm Password"
                             style={styles.input}
                             value={this.state.controls.confirmPassword.value}
                             onChangeText = { (val) => this.updateInputState('confirmPassword',val)}/>
                        </View >
                    </View>
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
        alignItems: "center",
        justifyContent: "center",
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
    },
    });

export default AuthScreen;