import axios from 'axios';
const URL = process.env.URL || 'http://localhost:3000'
export let startFetch = () => {
    return {
        type: 'START_FETCH'
    }
}
export let finishFetch = () => {
    return {
        type: 'FINISH_FETCH'
    }
}
export let successLogin = (token) => {
    return {
        type: 'SUCCESS_LOGIN',
        token
    }
}
export let failLogin = (message) => {
    return {
        type: 'FAIL_LOGIN',
        message
    }
}
export let login = (email, password) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        return axios.post(`${URL}/api/login`, {
            email,
            password
        }).then((res) => {
                dispatch(successLogin(res.data.token));
                dispatch(finishFetch());
        })
            .catch((err) => {
                if (err.response) {
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(setError('Oops. Something went wrong! Try again.'));
                    dispatch(finishFetch());
                }
            })
    }
}
export let setError = (message) => {
    return (dispatch, getState) => {
        dispatch(errorMessage(message));
        setTimeout(() => {
            dispatch(removeError())
        }, 2000);
    }
}
export let removeError = () => {
    return {
        type: 'REMOVE_ERROR'
    };
}
export let addItems = (items) => {
    return {
        type: 'ADD_ITEMS',
        items,
    }
}
export let deleteItems = () => {
    return {
        type: 'DELETE_ITEMS'
    }
}
export let errorMessage = (message) => {
    return {
        type: 'ERROR',
        message
    }
}
export let fetchItems = () => {
    return (dispatch, getState) => {
        dispatch(startFetch());
            return axios.get(`${URL}/api/items`)
            .then((res) => {
                dispatch(addItems(res.data));
                dispatch(finishFetch());
            })
            .catch((err) => {
                if (err.response) {
                    dispatch(errorMessage(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(errorMessage('Oops. Something went wrong! Try again.'));
                    dispatch(finishFetch());
                }
            })
    } 
}
export let updateItem = (obj) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        return axios.patch(`${URL}/api/items/${obj.id}`, {
            name: obj.name,
            number: obj.number,
            state: obj.state,
            token: obj.token
        })
        .then((res) => {
            dispatch(finishFetch());
        })
        .catch((err) => {
                if (err.response) {
                    dispatch(errorMessage(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(errorMessage('Oops. Something went wrong! Try again.'));
                    dispatch(finishFetch());
                }
            })
    }
}