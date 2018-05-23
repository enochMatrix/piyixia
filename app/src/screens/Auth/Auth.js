import React,{Component} from 'react';
import {View, Text,Button,TextInput,StyleSheet,ImageBackground, Dimensions, KeyboardAvoidingView,Keyboard,TouchableNativeFeedback} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../asset/1.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../../src/utility/validation';
import {connect} from 'react-redux';
import {addPlace} from "../../store/actions";
import {tryAuth} from '../../store/actions/index';



class AuthScreen extends Component {
    state = {
        styles: {
            pwContainerDirection: 'column',
            pwContainerJustifyContent: 'flex-start',
            pwWidth: '100%'
        },
        authMode:'login',
        controls: {
            email: {
                value: '',
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPasword: {
                    value: '',
                    valid: false,
                    validationRules: {
                        equalTo: 'password'
                    },
                touched: false

                }
            }
        };


    constructor(props) {
        super(props);
        Dimensions.addEventListener('change', dims => {
            console.log(dims);
            this.setState({
                styles: {
                    pwContainerDirection: Dimensions.get('window').height > 500||
                        this.state.authMode==='login'? 'column' : 'row',
                    pwContainerJustifyContent: Dimensions.get('window').height > 500||
                    this.state.authMode==='login'
                        ? 'flex-start' : 'space-between',
                    pwWidth: Dimensions.get('window').height > 500||
                    this.state.authMode==='login'? '100%' : '45%'
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
                    pwContainerDirection: Dimensions.get('window').height > 500 ||
                    this.state.authMode==='login'? 'column' : 'row',
                    pwContainerJustifyContent: Dimensions.get('window').height > 500||
                    this.state.authMode==='login'? 'flex-start' : 'space-between',
                    pwWidth: Dimensions.get('window').height > 500||
                    this.state.authMode==='login'? '100%' : '45%'
                }
            })
        })
    }

    //unmount
    switchAuthModeHandler=()=>{
        this.setState(preState=>{
            return{
                authMode:preState.authMode==='login'?'signup':'login'
            }
        })
    };


    loginHandler = () => {
        const authData={
            email:this.state.controls.email.value,
            password:this.state.controls.password.value
        };
        this.props.onLogin(authData);
        startMainTabs()
    };

    updateInputState = (key, value) => {
        let connectedValue ={};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }

        }
        this.setState(preState => {
            return {
                controls: {
                    ...preState.controls,

                    confirmPasword: {
                        ...preState.controls.confirmPasword,
                        valid: key === 'password'
                            ? validate(preState.controls.confirmPasword.value,
                            preState.controls.confirmPasword.validationRules,
                            connectedValue)
                            : preState.controls.confirmPasword.valid
                    },
                    [key]: {
                        ...preState.controls[key],
                        value: value,
                        valid: validate(value,
                            preState.controls[key].validationRules,
                            connectedValue),
                        touched: true
                    },
                    //把三个VALUE传到validate中进行验证
                }
            }
        })
    };


    render() {
        let headingText = null;
        let confirmPasswordControl =null;

        if(this.state.authMode==='signup'){
            confirmPasswordControl=
                <DefaultInput placeholder="Confirm Password"
                              value={this.state.controls.confirmPasword.value}
                              onChangeText={(val) => this.updateInputState('confirmPasword', val)}
                              valid={this.state.controls.confirmPasword.valid}
                              touched={this.state.controls.confirmPasword.touched}/>
        }
        if (Dimensions.get('window').height > 500) {
            headingText = (
                <MainText>
                    <HeadingText style={styles.textHeading}>Please Log in</HeadingText>
                </MainText>
            )
        }
        let disabled='false';
        if(this.state.authMode==='login'){
            disabled=this.state.controls.email.valid&&
                this.state.controls.password.valid;
        }
        else{
            disabled=this.state.controls.confirmPasword.valid&&
                this.state.controls.password.valid&&
                this.state.controls.email.valid
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    {headingText}

                    <ButtonWithBackground color="#29aaf4"
                                          disabled='true'
                                          onpress={this.switchAuthModeHandler}>
                        Switch to {this.state.authMode==='login'?'signup':'login'}
                    </ButtonWithBackground>

                    <TouchableNativeFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.inputContainer}>

                        <DefaultInput placeholder="Your E-mail Adress"
                                      value={this.state.controls.email.value}
                                      onChangeText={(val) => this.updateInputState('email', val)}
                                      valid={this.state.controls.email.valid}
                                      touched={this.state.controls.email.touched}
                                      autoCapitalize='none'
                                      autoCorrect={false}
                                      keyboardType='email-address'
                                      />


                        <View style={{
                            flexDirection: this.state.styles.pwContainerDirection,
                            justifyContent: this.state.styles.pwContainerJustifyContent
                        }}>

                            <View style={{
                                width: this.state.styles.pwWidth
                            }}>
                                <DefaultInput placeholder="Password"
                                              value={this.state.controls.password.value}
                                              onChangeText={(val) => this.updateInputState('password', val)}
                                              valid={this.state.controls.password.valid}
                                              touched={this.state.controls.password.touched}
                                              secureTextEntry/>
                            </View>
                            <View style={{
                                width: this.state.styles.pwWidth
                            }}>
                                {confirmPasswordControl}
                            </View>

                        </View>
                    </View>
                    </TouchableNativeFeedback>

                    <ButtonWithBackground color="#29aaf4"
                                          onpress={this.loginHandler}
                                          disabled={disabled}>
                        Submit
                    </ButtonWithBackground>
                </KeyboardAvoidingView>
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

const mapDispatchToProps =dispatch =>{
    return{
        onLogin: (authData) => dispatch(tryAuth(authData)),
    }

};

export default connect(null,mapDispatchToProps)(AuthScreen);