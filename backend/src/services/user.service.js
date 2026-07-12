import User from '../models/User.js';

export const getAllUsersExcept = async (userId) => {
  return User.find({ _id: { $ne: userId } }).sort({ isOnline: -1, username: 1 });
};
