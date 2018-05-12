import {ADD_PLACE, SELETE_PLACE, DESELETE_PLACE, DELETE_PLACE} from '../actions/actionTypes';

const initialState = {
    places: [],
    selectPlace: null
};

const reducer = (state = initialState,action) => {
    switch (action.type) {
        case ADD_PLACE:
                return {
                ...state,
                places: state.places.concat({
                    key: Math.random(),
                    name: action.placeName,
                    image: {
                        // fetch image from online
                        uri: "https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg"
                    }
                })
            };

        case DELETE_PLACE:
            return {
                ...state,
                places: state.places.filter( place => {
                    return place.key !== state.selectPlace.key
                }),
                selectPlace: null
            };

        case SELETE_PLACE:
            return {
                ...state,
                selectPlace: state.places.find(place => place.key === action.placeKey)
            };

        case DESELETE_PLACE:
            return {
                ...state,
                selectPlace: null
            };
            default:
            return state;

    }
};

export default reducer;