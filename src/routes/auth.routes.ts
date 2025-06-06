import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// Auth routes
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

// Protected routes
router.get('/profile', authenticateToken, userController.getProfile.bind(userController));
router.put('/profile', authenticateToken, userController.updateProfile.bind(userController));

export default router; 