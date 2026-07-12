import { registerUser, loginUser } from '../services/auth.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await registerUser({ username, email, password });
    return successResponse(res, { user, token }, 'Registration successful', 201);
  } catch (error) {
    return errorResponse(res, error.message, 400);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    return successResponse(res, { user, token }, 'Login successful');
  } catch (error) {
    return errorResponse(res, error.message, 401);
  }
};

export const getMe = async (req, res) => {
  try {
    return successResponse(res, { user: req.user }, 'User fetched');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

export const logout = async (req, res) => {
  try {
    req.user.isOnline = false;
    req.user.lastSeen = new Date();
    await req.user.save();
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
