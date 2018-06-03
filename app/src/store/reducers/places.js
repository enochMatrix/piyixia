import {SET_PLACE, DELETE_PLACE} from '../actions/actionsTypes';
import image from '../../asset/1.jpg';

const initialState = {
    places: [],

};

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case SET_PLACE:
            return {
                ...state,
                places:action.places
            };
        // case ADD_PLACE:
        //     return {
        //         ...state,
        //         places: state.places.concat({
        //             key: Math.random(),
        //             name: action.placeName,
        //             location:action.location,
        //             image:action.image,
        //             // fetch image from online
        //         })
        //     };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter( place => {
                    return place.key !== action.placeKey
                }),
            };

        default:
            return state;

    }
};

export default reducer;