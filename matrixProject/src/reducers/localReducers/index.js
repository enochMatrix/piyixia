const initial = {
    piyixia: 'hahaha',
    counter: 1,
    result:[]
};

export default localReducer = (state = initial, action) => {
    const payload = action.payload;
    switch (action.type) {

        case "act":
            return {
                ...state,
                // const newstate = Object.assign({}, state);
                // newstate.counter = state.counter + 1;
                piyixia: 'hey'
            }

        case "decrease":
            return {
                ...state,
                counter: state.counter - action.payload
            }

        case "STORE_RESULT":
            return {
                ...state,
                result:result.concat()
                
            }



    }
    return state;
}

