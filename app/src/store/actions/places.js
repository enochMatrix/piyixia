import {ADD_PLACE,REMOVE_PLACE, SET_PLACES} from './actionTypes';
// applied http communication
import {uiStartLoading, uiStopLoading, authGetToken} from "./index";

export const addPlace = (placeName, location, image) => {

    return dispatch => {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch( () => {
                alert("No valid token found!")
            })
            .then( token => {
                authToken = token;
                // storage image on google cloud
                return fetch(
                    "https://us-central1-zhe-awesome-place.cloudfunctions.net/storeImage",
                    {
                    method: "POST",
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        "Authorization": "Bearer " + authToken
                    }
                })
            })
            .catch(err => {
                console.log(err);
                alert("something wrong!");
                dispatch(uiStopLoading())
            })
            .then(res => res.json())
            .then(parsedRes => {

                const placeDate = {
                    name: placeName,
                    location: location,
                    image: parsedRes.imageUrl
                };
                // add image url, name, location to database
                return fetch("https://zhe-awesome-place.firebaseio.com/places.json?auth="
                    + authToken, {
                    method: "POST",
                    body: JSON.stringify(placeDate)
                })
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            });
    }
};

// delete data in backend
export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .catch( () => {
                alert("No valid token found!")
            })
            .then( token => {
                dispatch(removePlace(key));
                return fetch("https://zhe-awesome-place.firebaseio.com/places" + key +".json?auth=" + token, {
                    method: "DELETE"
                })
            })
            .then(res => res.json())
            .then(parseRes => {
                console.log("Done!", parseRes);
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong!");
            })
    };
};

// delete local data by redux
export const removePlace = (key) => {
    return {
        type: REMOVE_PLACE,
        placeKey: key
    };
};

// get data from backend
export const getPlace = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return fetch("https://zhe-awesome-place.firebaseio.com/places.json?auth=" + token)
            })
            .catch(() => {
                alert("No valid token found!")  // handle token error only!
            })
                .then(res => res.json())
                .then(parseRes => {
                    const places = [];
                    for (let key in parseRes) {
                        places.push({
                            ...parseRes[key],
                            image: {
                                uri: parseRes[key].image
                            },
                            key: key
                        })
                    }
                    dispatch(setPlaces(places));
                })
                .catch(err => {
                    alert("something wrong");
                    console.log(err)
                })
        }

};

//save backend data in the local redux
export const setPlaces = (places) => {
    return {
        type: SET_PLACES,
        places: places,
    }
};
