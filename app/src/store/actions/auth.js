import {TRY_AUTH} from "./actionsTypes";
import {AUTH_SET_TOKEN} from './actionsTypes';
import {uiStartLoading,uiStopLoading} from './ui';
import StartMainTabs from '../../screens/MainTabs/startMainTabs/startMainTabs';

export const authSetToken =token =>{
    return {
        type:AUTH_SET_TOKEN,
        token:token
    }
};

export const tryAuth =(authDate,authMode) =>{
    return dispatch=>{
        dispatch(uiStartLoading);
        //default singin apiKey
        const apiKey ='AIzaSyDKzwD1SC1_c7APT_SlpvVV7WDiP5IlkZQ';
        let Url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+apiKey;
        if(authMode==='signup'){
            Url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+apiKey;
        }
        dispatch(authSign(authDate,Url))


    }

};
//the method to authentication of signin or signup according to APIKEY
export const authSign =(authData,Url)=>{
    return dispatch=>{
        fetch(Url,
            {
                method:'POST',
                body:JSON.stringify({
                    email:authData.email,
                    password:authData.password,
                    returnSecureToken:true

                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(parsedRes=>{
                dispatch(uiStopLoading());
                console.log(parsedRes);
                if(!parsedRes.idToken){
                    const errorMessage =parsedRes.error.errors[0].message;
                    alert(errorMessage);


                }else{
                    dispatch(authSetToken(parsedRes.idToken));
                    StartMainTabs();
                }
                console.log(parsedRes)
            })
            .catch(err=>{
                dispatch(uiStopLoading());
                console.log(err);
                alert('login failed please try again!')
            })
    }

};


