export let authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SUCCESS_LOGIN': 
            return {
                ...state,
                token: action.token
            }
        case 'FAIL_LOGIN':
            return {
                ...state,
                error: action.message
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