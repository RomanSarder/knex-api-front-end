import axios from 'axios';
const URL = 'https://tranquil-brook-11708.herokuapp.com' || 'http://localhost:3000'
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
                    dispatch(failLogin(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(failLogin('Oops. Something went wrong! Try again.'));
                    dispatch(finishFetch());
                }
            })
    }
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