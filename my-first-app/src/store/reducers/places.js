import {ADD_PLACE, DELETE_PLACE} from '../actions/actionTypes';

const initialState = {
    places: [],
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
            };
    }
};

export default reducer;