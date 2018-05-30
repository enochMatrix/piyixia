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

import { ADD_PLACE, DELETE_PLACE } from './actionsTypes';
// applied http communciation

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        const placeDate = {
            name: placeName,
            location: location
        };

fetch(' https://us-central1-awesome-place-1527277902911.cloudfunctions.net/storeImage',{
    method:'POST',
    body:JSON.stringify({
        image:image.base64
    })
})
    .catch(err=>{
        console.log(err)
    })
    .then(res=>{
        res.json()
    })
    .then(parsedRes=>{
        console.log(parsedRes)
        }
    )
        // fetch("https://console.firebase.google.com/project/zhe-awesome-place/database/zhe-awesome-place/data/places.json", {
        //     method: "POST",
        //     body: JSON.stringify(placeDate),
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then(res => res.json())
        //     .then(parsedRes => {
        //         console.log(parsedRes);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         throw err;
        //     });
    };

    // {
    //     type: ADD_PLACE,
    //     placeName: placeName,
    //     location: location,
    //     image: image
    // };
};

export const deletePlace = (key) => {
    return {
        type: DELETE_PLACE,
        placeKey: key
    };
};
