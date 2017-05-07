import * as redux from 'redux';
import thunk from 'redux-thunk';

import {authReducer, isLoadingReducer, itemsReducer, errorReducer} from 'reducers';

export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        isLoading: isLoadingReducer,
        auth: authReducer,
        items: itemsReducer,
        error: errorReducer
    });
    let createStoreWithMiddleware = redux.applyMiddleware(thunk)(redux.createStore);
    const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    return store;
}