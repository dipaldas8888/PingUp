import axios from 'axios';

const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const api = axios.create({
  baseURL: isDev ? '/api' : 'https://pingup-zcce.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Attach JWT to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pingup_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pingup_token');
      localStorage.removeItem('pingup_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
