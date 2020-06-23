import axios from 'axios';

const url = 'localhost'; // const url_andorid = '10.0.2.2';

const api = axios.create({
  baseURL: `http://${url}:3333`
});

export default api;

