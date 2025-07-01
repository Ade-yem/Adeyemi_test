import { Router } from 'express';
import authRoutes from './auth.routes';
import inventoryRoutes from './inventory.routes';
import categoryRoutes from './category.routes';
import orderRoutes from './order.routes';
import { authenticateToken } from '../middleware/auth';

const router = Router();

// Mount routes
router.get("/status", (req, res) => {
  res.status(200).json({message: "The server is live and connected"})
})
router.use('/auth', authRoutes);
router.use('/inventory', authenticateToken, inventoryRoutes);
router.use('/categories', authenticateToken, categoryRoutes);
router.use('/orders', authenticateToken, orderRoutes);

export default router;
