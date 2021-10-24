import axios from 'axios';

const api = axios.create({
    baseURL: 'https://server-system-prdbomfilho.herokuapp.com'
});

export default api;