const axios = require('axios');
const URL = process.env.URL || 'http://localhost:3000'


return axios.post(`${URL}/api/login`, {
        email: 'roman@ya.ru23',
        password: '123'
    }).then((res) => {
        console.log(res.data);
    })
    .catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('FIRST IF');
            console.log(error.response.data.message);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log('SECOND IF');
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            console.log('ELSE');
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    })