import {ADD_PLACE, DELETE_PLACE, SELETE_PLACE, DESELETE_PLACE} from './actionsTypes';

export const addPlace = (placeName) => {
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
};

export const deletePlace = () => {
    return {
        type: DELETE_PLACE
    }
};

export const selectPlace = (key) => {
    return {
        type: SELETE_PLACE,
        placeKey: key
    }
};

export const deselectPlace = () => {
    return {
        type: DESELETE_PLACE
    }
};