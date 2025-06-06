import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

// Auth routes
router.post('/register', userController.register.bind(userController));
router.post('/login', userController.login.bind(userController));

// Protected routes
router.get('/profile', userController.getProfile.bind(userController));
router.put('/profile', userController.updateProfile.bind(userController));

export default router; 