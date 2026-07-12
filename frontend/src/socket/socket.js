import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (socket?.connected) return socket;

  const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const socketUrl = isDev ? 'http://localhost:5000' : 'https://pingup-zcce.onrender.com';

  socket = io(socketUrl, {
    auth: { token },
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => console.log('🔌 Socket connected:', socket.id));
  socket.on('connect_error', (e) => console.error('Socket error:', e.message));
  socket.on('disconnect', (reason) => console.log('🔌 Socket disconnected:', reason));

  return socket;
};

export const disconnectSocket = () => {
  if (socket) { socket.disconnect(); socket = null; }
};

export const getSocket = () => socket;
