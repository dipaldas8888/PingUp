import { createMessage, getConversation, markMessagesAsRead } from '../services/message.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const newMessage = await createMessage({ senderId: req.user._id, receiverId, message });
    return successResponse(res, { message: newMessage }, 'Message sent', 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    await markMessagesAsRead(receiverId, req.user._id);
    const messages = await getConversation(req.user._id, receiverId);
    return successResponse(res, { messages });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
