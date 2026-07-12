import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';
import { errorResponse } from '../utils/response.js';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Not authorized. No token provided.', 401);
    }
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    if (!user) return errorResponse(res, 'User not found', 401);
    req.user = user;
    next();
  } catch {
    return errorResponse(res, 'Not authorized. Invalid token.', 401);
  }
};

export default protect;
