import { Router } from 'express';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { checkSession, login, logout } from '../controllers/authController.js';

const router = Router();

router.get('/', authenticateUser, checkSession);
router.post('/', login);
router.delete('/', logout);

export default router;
