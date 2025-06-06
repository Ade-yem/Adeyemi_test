import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';

const router = Router();
const orderController = new OrderController();

// Order routes
router.post('/', orderController.createOrder.bind(orderController));
router.get('/', orderController.getOrders.bind(orderController));
router.get('/:id', orderController.getOrder.bind(orderController));
router.put('/:id/status', orderController.updateOrderStatus.bind(orderController));
router.post('/:id/cancel', orderController.cancelOrder.bind(orderController));

export default router; 