import Message from '../models/Message.js';

const POPULATE_FIELDS = 'username avatar isOnline';

export const createMessage = async ({ senderId, receiverId, message }) => {
  const created = await Message.create({ sender: senderId, receiver: receiverId, message });
  return Message.findById(created._id)
    .populate('sender', POPULATE_FIELDS)
    .populate('receiver', POPULATE_FIELDS);
};

export const getConversation = async (userId, receiverId) => {
  return Message.find({
    $or: [
      { sender: userId, receiver: receiverId },
      { sender: receiverId, receiver: userId },
    ],
  })
    .sort({ createdAt: 1 })
    .populate('sender', POPULATE_FIELDS)
    .populate('receiver', POPULATE_FIELDS);
};

export const markMessagesAsRead = async (senderId, receiverId) => {
  await Message.updateMany(
    { sender: senderId, receiver: receiverId, read: false },
    { read: true }
  );
};
