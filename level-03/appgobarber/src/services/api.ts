import axios from 'axios';

// inform current IP
const api = axios.create({
  baseURL: 'http://192.168.15.38:3333',
});

export default api;
