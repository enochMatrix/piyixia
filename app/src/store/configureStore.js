import {createStore, combineReducers,compose } from 'redux';

import placeReducer from './reducers/places';

const rootReducer = combineReducers({
    places: placeReducer
});

let composeEnhancers = compose;
if(__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
}
// a way to reveal redux devTool in react-native debugger, you can see things
// such as function name, state change when you perform sth!

const configureStore = () => {
    return createStore(rootReducer,composeEnhancers())
};

export default configureStore;