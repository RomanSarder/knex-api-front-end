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
            if (res.status !== 200) {
                dispatch(failLogin(res.data.message));
                dispatch(finishFetch());
            } else {
                dispatch(successLogin(res.data.token));
                dispatch(finishFetch());
            }
        })
            .catch((err) => {
                dispatch(failLogin('Something went wrong. Try again!'));
                dispatch(finishFetch());
            })
    }
}