import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { createMessage } from '../services/message.service.js';

// userId (string) -> socketId
const connectedUsers = new Map();

export const getSocketId = (userId) => connectedUsers.get(userId.toString());

const setupSocket = (io) => {
  // Authenticate each socket connection with JWT
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication error: No token'));
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.userId);
      if (!user) return next(new Error('Authentication error: User not found'));
      socket.user = user;
      next();
    } catch {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  io.on('connection', async (socket) => {
    const userId = socket.user._id.toString();
    console.log(`🔌 Connected: ${socket.user.username} (${socket.id})`);

    connectedUsers.set(userId, socket.id);
    socket.join(userId);

    // Mark user online
    await User.findByIdAndUpdate(userId, { isOnline: true });
    io.emit('user_online', { userId });

    // Send message
    socket.on('send_message', async ({ receiverId, message }) => {
      try {
        const savedMessage = await createMessage({ senderId: userId, receiverId, message });

        // Emit to receiver if online
        const receiverSocketId = connectedUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('receive_message', savedMessage);
        }
        // Confirm back to sender
        socket.emit('receive_message', savedMessage);
      } catch (error) {
        socket.emit('error', { message: error.message });
      }
    });

    // Typing events
    socket.on('typing', ({ receiverId }) => {
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) io.to(receiverSocketId).emit('typing', { senderId: userId });
    });

    socket.on('stop_typing', ({ receiverId }) => {
      const receiverSocketId = connectedUsers.get(receiverId);
      if (receiverSocketId) io.to(receiverSocketId).emit('stop_typing', { senderId: userId });
    });

    // Disconnect
    socket.on('disconnect', async () => {
      console.log(`🔌 Disconnected: ${socket.user.username}`);
      connectedUsers.delete(userId);
      await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
      io.emit('user_offline', { userId });
    });
  });
};

export default setupSocket;
