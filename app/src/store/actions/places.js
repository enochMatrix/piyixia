// import {ADD_PLACE, DELETE_PLACE } from './actionsTypes';
//
// export const addPlace = (placeName,location,image) => {
//     return dispatch => {
//
//         const placeData={
//             name:placeName,
//             location: location,
//         };
//
//         fetch('https://zhe-awesome-place.firebaseio.com/places.json',
//             {
//                 method:'POST',
//                 body: JSON.stringify(placeData),
//             })
//             .catch(err=> console.log(err) )
//             .then(res=>res.json())
//             .then(parsedRes=> console.log(parsedRes));
//
//     }
// };
//
// export const deletePlace = (key) => {
//     return {
//         type: DELETE_PLACE,
//         placeKey: key,
//     }
// };

import {ADD_PLACE, DELETE_PLACE,SET_PLACE} from './actionsTypes';
// applied http communciation
import {uiStartLoading, uiStopLoading,authGetToken} from "./index";


export const addPlace = (placeName, location, image) => {
    return dispatch=> {
        let authToken;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .catch(()=>{
                alert('no valid token found')
            })
            .then(token=>{
                authToken=token;
                return fetch('https://us-central1-awesome-place-1527277902911.cloudfunctions.net/storeImage',{
                    method:'POST',
                    body:JSON.stringify({
                        image:image.base64
                    }),
                    headers:{
                        "Authorization":'Bearer '+authToken
                        //send the token to the backend
                    }
                    })
            })//authGetToken is a promise
    .then(res=>{
        res.json()
    })
    .then(parsedRes=>{
        console.log(parsedRes);
        const placeData={
            name: placeName,
            location: location,
            image:"https//image",
        };
        return fetch('https://zhe-awesome-place.firebaseio.com/places.json?auth='+ authToken,
            {
                method:'POST',
                body: JSON.stringify(placeData)
            })
                .then(res=>res.json())
                .then(parsedRes=> {console.log(parsedRes);
                    dispatch(uiStopLoading())})
            .catch(err=> {console.log(err);
                dispatch(uiStopLoading())} );




        }
    )
    .catch(err=>{
        alert('sth wrong!');
        dispatch(uiStopLoading());
        console.log(err)
    })

    };

};

export const getPlaces =()=>{
    return dispatch=>{
        dispatch(authGetToken())
            .then(token=>{
                return fetch('https://zhe-awesome-place.firebaseio.com/places.json?auth='+token)
            })//authGetToken is a promise
            .catch(()=>{
                alert('no valid token found')
            })

        // const token =getState().auth.token;
        // if(!token){
        //     return;
        // }
        //get the token return from database;
            .then(res=>res.json())
            .then(parsedRes=>{
                const places =[];
                for(let key in parsedRes){
                    places.push({
                        ...parsedRes[key],
                        key:key,
                        image:{
                            uri: parsedRes[key].image
                        }
                    })
                }

                    dispatch(setPlaces(places));
                    console.log(parsedRes)
                })
            .catch(err=>{
            alert('error');
            console.log(err);
        })

    }
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
// to delete local data

export const removePlace =(key)=>{
    return dispatch=>{
        // const token =getState().auth.token;
        dispatch(authGetToken())
            .then(token=>{
                dispatch(deletePlace(key));//remove place locally
                return fetch('https://zhe-awesome-place.firebaseio.com/places/'+key+'.json?auth='+token,{
                    method:'DELETE'
                })//remove place remotely
            })

            .catch(()=>{
                alert('no valid token found')
            })

            .then(res=>res.json())
            .then(parsedRes=>{
                    console.log('DONE!')
                })
            .catch(err=>{
                alert('error');
                console.log(err);
            })
    }
};//delete remote data

export  const setPlaces =(places)=>{
    return{
        type:SET_PLACE,
        places:places
    }
};
