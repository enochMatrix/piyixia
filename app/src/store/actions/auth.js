import {TRY_AUTH} from './actionTypes';

export const tryAuth = (authDate) => {
    return {
        type: TRY_AUTH,
        authDate: authDate
    }
};