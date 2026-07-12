import api from './axios.js';

export const getUsersAPI = () => api.get('/users');
