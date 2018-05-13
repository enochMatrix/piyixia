import {ADD_PLACE, SELETE_PLACE, DESELETE_PLACE, DELETE_PLACE} from '../actions/actionsTypes';

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
                        uri: 'https://dynaimage.cdn.cnn.com/cnn/q_auto,w_1024,c_fill,g_auto,h_576,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F180313182911-01-las-vegas-travel-strip.jpg'
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