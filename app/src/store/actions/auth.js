import {AsyncStorage} from 'react-native';
import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from './ui';
import startMainTab from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';
import {Navigation} from "react-native-navigation";

const API_KEY = "AIzaSyDKzwD1SC1_c7APT_SlpvVV7WDiP5IlkZQ";
export const tryAuth = (authData, authMode) => {

    return dispatch => {
        dispatch(uiStartLoading());

        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + API_KEY;
        if(authMode === 'signup') {
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + API_KEY;
        }
        dispatch(authSignup(authData, url));
        }

    // return {
    //     type: TRY_AUTH,
    //     authDate: authDate
    // }
};

// sign up/log in  method
export const authSignup = (authData, url) => {
    return dispatch => {
      fetch(url,{
          method: "POST",
          body: JSON.stringify({
              email: authData.email,
              password: authData.password,
              returnSecureToken: true
          }),
          headers: {
              "Content-Type": "application/json"
          }
      })
          .catch(err => {
              console.log(err);
              dispatch(uiStopLoading());
          })
          .then(res => res.json())
          .then(parseRes => {
              dispatch(uiStopLoading());
              console.log(parseRes);
              if(!parseRes.idToken) {
                alert("Auth failed, please try again!");
              } else {
                  // async store token in redux store
                  dispatch(authStoreToken(
                      parseRes.idToken,
                      parseRes.expiresIn,
                      parseRes.refreshToken));
                  startMainTab();
              }
              // console.log(parseRes);

          })
    };
};
// store token in asyncStore
export const authStoreToken = (token, expiryTime, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiryTime * 1000;
        console.log(now, new Date(expiryDate));
        AsyncStorage.setItem("zheap:auth:token", token);
        AsyncStorage.setItem("zheap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("zheap:auth:refreshToken", refreshToken);
    }
};
// store token in redux store
export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
};
// helper function
export const authGetToken = () => {
    return (dispatch,getState) => {
        const promise = new Promise( (resolve, reject) => {
            const token = getState().auth.token;
            let tokenStorage = null;
            if(!token) {
                // check if async storage has token
                AsyncStorage.getItem("zheap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        tokenStorage = tokenFromStorage;
                        // check expiry time
                        return AsyncStorage.getItem("zheap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                                const parseExpiryDate = new Date(parseInt(expiryDate));
                                const now = new Date();
                                if (parseExpiryDate > now) {
                                    dispatch(authSetToken(tokenStorage));
                                    resolve(tokenStorage)
                                } else {
                                     reject();
                                }
                            })

            } else {
                resolve(token);
            }
        });
        return promise.catch(error => {
            return AsyncStorage.getItem("zheap:auth:refreshToken")
                .then(refreshToken => {
                    return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: "grant_type=refresh_token&refresh_token=" + refreshToken
                    })
                })
                .then(res => res.json())
                .then(parseRes => {
                    if(parseRes.id_token) {
                        console.log("Refresh token worked!");
                        dispatch(authStoreToken(
                            parseRes.id_token,
                            parseRes.expires_in,
                            parseRes.refresh_token));
                        return parseRes.id_token;
                    } else {
                        dispatch(authClearStorage());
                    }
                });
        })
            .then(token => {
                if(!token) {
                    throw(new Error())
                } else {
                    return token;
                }
            });
    }
};
// first step when auth screen didmount
export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTab();
            })
            .catch(err => console.log("Failed to get token!"))
    }
};
// clear the async store
export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("zheap:auth:token");
        AsyncStorage.removeItem("zheap:auth:expiryDate");
       return AsyncStorage.removeItem("zheap:auth:refreshToken");

    }
};

export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then( () => {
                Navigation.startSingleScreenApp({
                    screen: {
                        screen: "awesome-places.AuthScreen",
                        title: "Login"
                    }
                });
            });
        dispatch(authRemoveToken());
    }
};

export const authRemoveToken =() => {
    return {
        type: AUTH_REMOVE_TOKEN
    }
};