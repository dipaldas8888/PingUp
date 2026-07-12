import api from './axios.js';

export const sendMessageAPI  = (data)       => api.post('/messages', data);
export const getMessagesAPI  = (receiverId) => api.get(`/messages/${receiverId}`);
