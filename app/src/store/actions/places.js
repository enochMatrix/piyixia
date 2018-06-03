import {ADD_PLACE,REMOVE_PLACE, SET_PLACES} from './actionTypes';
// applied http communication
import {uiStartLoading, uiStopLoading} from "./index";

export const addPlace = (placeName, location, image) => {

    return dispatch => {

        dispatch(uiStartLoading());

        // storage image on google cloud
        fetch("https://us-central1-zhe-awesome-place.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
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
                return fetch("https://zhe-awesome-place.firebaseio.com/places.json", {
                    method: "POST",
                    body: JSON.stringify(placeDate)
                })
            })
            .catch(err => {
                console.log(err);
                dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
            });
    }
};

// delete data in backend
export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));
        fetch("https://zhe-awesome-place.firebaseio.com/places" + key +".json", {
            method: "DELETE"
        })
            .catch(err => {
                console.log(err);
                alert("Something went wrong!");
            })
            .then(res => res.json())
            .then(parseRes => {
                console.log("Done!", parseRes);
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
        fetch("https://zhe-awesome-place.firebaseio.com/places.json")
            .catch( err => {
                alert("something wrong");
                console.log(err)
            })
            .then(res => res.json())
            .then( parseRes => {
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
    }

};

//save backend data in the local redux
export const setPlaces = (places) => {
    return {
        type: SET_PLACES,
        places: places,
    }
};
