import { getAllUsersExcept } from '../services/user.service.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsersExcept(req.user._id);
    return successResponse(res, { users });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
