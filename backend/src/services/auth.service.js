import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async ({ username, email, password }) => {
  const existing = await User.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    if (existing.email === email) throw new Error('Email already registered');
    throw new Error('Username already taken');
  }
  const user = await User.create({ username, email, password });
  const token = generateToken(user._id);
  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');
  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid credentials');
  user.isOnline = true;
  await user.save();
  const token = generateToken(user._id);
  return { user, token };
};
