import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-19d47.firebaseio.com/',
});

export default instance;
