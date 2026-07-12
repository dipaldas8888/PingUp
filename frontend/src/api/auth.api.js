import api from './axios.js';

export const registerAPI   = (data) => api.post('/auth/register', data);
export const loginAPI      = (data) => api.post('/auth/login', data);
export const getMeAPI      = ()     => api.get('/auth/me');
export const logoutAPI     = ()     => api.post('/auth/logout');
