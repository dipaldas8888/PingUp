import { Router } from 'express';
import { getUsers } from '../controllers/user.controller.js';
import protect from '../middleware/auth.js';

const router = Router();

router.get('/', protect, getUsers);

export default router;
