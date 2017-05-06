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
        default:
            return state;
    }      
}