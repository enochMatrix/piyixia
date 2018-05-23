import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import startMainTabs from '../MainTabs/startMainTabs';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/beautiful-place.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import {tryAuth} from '../../store/actions/index'

class AuthScreen extends Component {

    state = {
        styles: {
            pwContainerDirection: "column",
            pwContainerJustifyContent: "flex-start",
            pwWrapperWidth: "100%",
        },
        authMode: 'login',
        controls: {
                email: {
                    value: "",
                    valid: false,
                    validationRules: {
                        isEmail: true
                    },
                    touched: false
                },
                password:{
                    value: "",
                    valid: false,
                    validationRules: {
                        minLength: 6
                    },
                    touched: false
                },
                confirmPassword:{
                    value: "",
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                    touched: false
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
                    pwContainerDirection: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "column" :"row",
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "flex-start":"space-between",
                    pwWrapperWidth: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "100%" : "45%",
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
                    pwContainerDirection: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "column" :"row",
                    pwContainerJustifyContent: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "flex-start":"space-between",
                    pwWrapperWidth: Dimensions.get('window').height > 500 || this.state.authMode === 'login' ? "100%" : "45%",
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

        // for reset password, recheck the validation of confirm password
        if( key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }

        // end
        this.setState(prevState => {
           return {
              controls: {
                  ...prevState.controls,
                  confirmPassword: {
                      ...prevState.controls.confirmPassword,
                      valid: key === 'password'
                          ? validate(prevState.controls.confirmPassword.value,
                              prevState.controls.confirmPassword.validationRules,
                              connectedValue)
                          : prevState.controls.confirmPassword.valid
                  },
                   [key]: {
                      ...prevState.controls[key],
                      valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                      value: value,
                       touched: true
                  },
                }
              }
           })
    };
    // switch to log in mode by button

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
     };

// switch to tab based nav
    loginHandler = () => {
        const authDate = {
          email: this.state.controls.email.value,
          password: this.state.controls.password.value
        };
        this.props.onLogin(authDate);
        startMainTabs();

    };

    render () {

        let headingText = null;

        let confirmPasswordControl = null;
        if(this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={{width: this.state.styles.pwWrapperWidth}}>
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText = { (val) => this.updateInputState('confirmPassword',val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry/>
                </View >
            )
        }
        // responsive display

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
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        {headingText}
                        <ButtonWithBackground color="#29aaf4"
                                              onPress={this.switchAuthModeHandler}
                                              disabled="true">
                            Switch to {this.state.authMode === 'login' ? "Sign Up" : "Log In"}!
                        </ButtonWithBackground>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inputContainer}>
                                <DefaultInput
                                    placeholder="Your Email"
                                    style={styles.input}
                                    value={this.state.controls.email.value}
                                    onChangeText = { (val) => this.updateInputState('email',val)}
                                    valid={this.state.controls.email.valid}
                                    touched={this.state.controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"/>
                                <View style={{flexDirection: this.state.styles.pwContainerDirection,
                                              justifyContent: this.state.styles.pwContainerJustifyContent}}>
                                    <View style={{width: this.state.styles.pwWrapperWidth}}>
                                     <DefaultInput
                                         placeholder="Your Password"
                                         style={styles.input}
                                         value={this.state.controls.password.value}
                                         onChangeText = { (val) => this.updateInputState('password',val)}
                                         valid={this.state.controls.password.valid}
                                         touched={this.state.controls.password.touched}
                                         secureTextEntry/>
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <ButtonWithBackground color="#29aaf4"
                                              onPress={this.loginHandler}
                                              disabled={(this.state.controls.confirmPassword.valid || this.state.authMode === 'login')&&
                                                        this.state.controls.password.valid &&
                                                        this.state.controls.email.valid}>
                            Submit
                        </ButtonWithBackground>
                    </KeyboardAvoidingView>
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

const mapDispatchToProps = dispatch => {
   return {
       onLogin: (authDate) => dispatch(tryAuth(authDate))
   }
};

export default connect(null, mapDispatchToProps)(AuthScreen);