import * as redux from 'redux';
import thunk from 'redux-thunk';
import {routerReducer, routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

import {authReducer, isLoadingReducer, itemsReducer, errorReducer} from 'reducers';

export let configure = (initialState = {}) => {
    let reducer = redux.combineReducers({
        isLoading: isLoadingReducer,
        auth: authReducer,
        items: itemsReducer,
        error: errorReducer,
        routing: routerReducer
    });
    const middleware = routerMiddleware(browserHistory)
    let createStoreWithMiddleware = redux.applyMiddleware(thunk, middleware)(redux.createStore);
    const store = createStoreWithMiddleware(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    return store;
}