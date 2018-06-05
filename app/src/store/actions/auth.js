import {TRY_AUTH} from "./actionsTypes";
import {AUTH_SET_TOKEN} from './actionsTypes';
import {uiStartLoading,uiStopLoading} from './ui';
import StartMainTabs from '../../screens/MainTabs/startMainTabs/startMainTabs';
import {AsyncStorage} from 'react-native';
//AsyncStorage is an API to store token

export const authStoreToken =(token,expiresIn) =>{
  return dispatch =>{
      dispatch(authSetToken(token));
      const now =new Date();
      const expiryDate =now.getTime()+20*1000;
      console.log(now,new Date(expiryDate));
      AsyncStorage.setItem('ap:auth:token',token);
      AsyncStorage.setItem('ap:auth:expiryDate',expiryDate.toString())
  }
};//get the token from storage

export const authSetToken =token =>{
    return {
        type:AUTH_SET_TOKEN,
        token:token
    }
};//set the token as a state in redux

//authGetToken is a useful function which can be used to add the token anywhere!
export const authGetToken =()=>{
    return (dispatch,getState)=>{
        const promise =new Promise((resolve,reject)=>{
            const token =getState().auth.token;
            let storageToken =null;
            if(!token){
                AsyncStorage.getItem('ap:auth:token')
                    .catch(err=>reject())
                    .then(tokenFromStorage=>{
                        storageToken=tokenFromStorage;

                        if(!tokenFromStorage){
                            reject();
                            return;

                            //if there is no valid token in storage,
                            //we will return without excuting the code below
                        }
                        return AsyncStorage.getItem('ap:auth:expiryDate')})
                    .then(expiryDate=>{
                        const parsedExpiryDate =new Date(parseInt(expiryDate));
                        const now =new Date();
                        if(parsedExpiryDate> now){
                            dispatch(authSetToken(storageToken));
                            resolve(storageToken);
                        }else{
                            reject();
                        }
                    })
                        //token here is a promise, so we need to resolve and reject it.
                    }
                //if there is no token, get it from AsyncStorage API
            else{
                resolve(token)
            }
        });
        promise.catch(err=>authClearStorage());
        return promise;
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
                    dispatch(authStoreToken(parsedRes.idToken,parsedRes.expiresIn));
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

export const autoSignIn =()=>{
    return dispatch=>{
        dispatch(authGetToken())
            //the token mostly come from AsyncStorage;
            .then(token => {
                StartMainTabs();
            })
            .catch(err=>console.log('fail to get token'))

    }
};

export const authClearStorage =()=>{
    AsyncStorage.removeItem('app:auth:token');
    AsyncStorage.removeItem('app:auth:expiryDate')
};


