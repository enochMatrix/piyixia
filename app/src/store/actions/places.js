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
import {uiStartLoading, uiStopLoading} from "./ui";


export const addPlace = (placeName, location, image) => {
    return dispatch=> {
        dispatch(uiStartLoading());
fetch('https://us-central1-awesome-place-1527277902911.cloudfunctions.net/storeImage',{
    method:'POST',
    body:JSON.stringify({
        image:image.base64
    })
})
    .then(res=>{
        res.json()
    })
    .then(parsedRes=>{
        console.log(parsedRes);
        const placeData={
            name: placeName,
            location: location,
            image:parsedRes.imageUrl,
        };
        return fetch('https://zhe-awesome-place.firebaseio.com/places.json',
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
    return (dispatch,getState)=>{

        const token =getState().auth.token;
        if(!token){
            return;
        }
        //get the token return from database;
        fetch('https://zhe-awesome-place.firebaseio.com/places.json?auth='+token)
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
        dispatch(deletePlace(key));
        // const token =getState().auth.token;
        fetch('https://zhe-awesome-place.firebaseio.com/places/'+key+'.json',{
            method:'DELETE'
        })
            .then(res=>res.json())
            .then(parsedRes=>{
                    console.log('DONE!')
                }
            )
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
