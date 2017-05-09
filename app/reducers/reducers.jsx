export let authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUCCESS_LOGIN': 
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}
export let isLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'START_FETCH':
            return true;
        case 'FINISH_FETCH':
            return false;
        default:
            return state;
    }      
}
export let itemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ITEMS':
            return [
                ...state,
                ...action.items
            ]
        case 'DELETE_ITEMS':
            return [];
        case 'UPDATE_STORE_ITEM':
            return state.map((item) => {
                if (item.id === action.updated.id) {
                    return action.updated;
                }
                return item;
            })
        default:
            return state;
    }
}
export let errorReducer = (state = '', action) => {
    switch (action.type) {
        case 'ERROR':
            return action.message;
        case 'FAIL_LOGIN':
            return action.message
        case 'REMOVE_ERROR':
            return ''
        default:
            return state;
    }
}