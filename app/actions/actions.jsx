import axios from 'axios';

export let startFetch = () => {
    return {
        type: 'START_FETCH'
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
        dispatch(startFetch);
        return axios.post('https://tranquil-brook-11708.herokuapp.com/api/login', {
            email,
            password
        }).then((res) => {
            if (res.status !== 200) {
                dispatch(failLogin(res.data.message));
            } else {
                dispatch(successLogin(res.data.token));
            }
        })
            .catch((err) => {
                dispatch(failLogin('Something went wrong. Try again!'));
            })
    }
}