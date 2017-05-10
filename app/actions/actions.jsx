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
        }).catch((err) => {
                if (err.response) {
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    console.log(err);
                    dispatch(setError('Oops. Something went wrong!'));
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
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(setError('Oops. Something went wrong!'));
                    dispatch(finishFetch());
                }
            })
    } 
}
export let updateStoreItem = (updated) => {
    return {
        type: 'UPDATE_ITEM',
        updated
    }
}
export let updateItem = (update) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        return axios.patch(`${URL}/api/items/${update.id}`, {
            name: update.name,
            number: update.number,
            state: update.state,
        }, {headers: {'Authorization': `Bearer ${update.token}`}})
        .then((res) => {
            dispatch(updateStoreItem(res.data));
            dispatch(finishFetch());
        })
        .catch((err) => {
                if (err.response) {
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(setError('Oops. Something went wrong!'));
                    dispatch(finishFetch());
                }
            })
    }
}
export let createItem = (created) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        return axios.post(`${URL}/api/items`, {
            name: created.name,
            number: created.number,
            state: created.state,
        },{headers: {'Authorization': `Bearer ${created.token}`}})
        .then((res) => {
            dispatch(createStoreItem(res.data));
            dispatch(finishFetch());
        })
        .catch((err) => {
                if (err.response) {
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(setError('Oops. Something went wrong!'));
                    dispatch(finishFetch());
                }
            })
    }
}
export let createStoreItem = (item) => {
    return {
        type: 'CREATE_ITEM',
        item
    };
}
export let deleteStoreItem = (id) => {
    return {
        type: 'DELETE_ITEM',
        id
    }
}
export let deleteItem = (id, token) => {
    return (dispatch, getState) => {
        dispatch(startFetch());
        return axios.delete(`${URL}/api/items/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        .then((res) => {
            dispatch(deleteStoreItem(id));
            dispatch(finishFetch())
        })
        .catch((err) => {
                if (err.response) {
                    dispatch(setError(err.response.data.message));
                    dispatch(finishFetch());
                } else {
                    dispatch(setError('Oops. Something went wrong!'));
                    dispatch(finishFetch());
                }
            })
    }
}
