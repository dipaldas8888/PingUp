import { Router } from 'express';
import { body } from 'express-validator';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protect from '../middleware/auth.js';
import validate from '../middleware/validate.js';

const router = Router();

router.post('/', protect, [
  body('receiverId').notEmpty().withMessage('Receiver ID is required'),
  body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  validate,
], sendMessage);

router.get('/:receiverId', protect, getMessages);

export default router;
