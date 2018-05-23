import {TRY_AUTH} from "./actionsTypes";
export const tryAuth =(authDate) =>{
    return{
        type: TRY_AUTH,
        authDate: authDate
    }

};