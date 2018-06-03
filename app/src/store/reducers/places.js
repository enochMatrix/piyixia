import {
    SET_PLACES,
    REMOVE_PLACE
} from "../actions/actionTypes";

const initialState = {
    places: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(place => {
                    return place.key !==  action.placeKey;
                })
            };
        case SET_PLACES:
            return {
                ...state,
                places: action.places
            };
        default:
            return state;
    }
};

export default reducer;
