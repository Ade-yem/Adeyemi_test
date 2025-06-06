import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';

const router = Router();
const inventoryController = new InventoryController();

// Inventory routes
router.post('/', inventoryController.createItem.bind(inventoryController));
router.get('/', inventoryController.getItems.bind(inventoryController));
router.get('/:id', inventoryController.getItem.bind(inventoryController));
router.put('/:id', inventoryController.updateItem.bind(inventoryController));
router.delete('/:id', inventoryController.deleteItem.bind(inventoryController));

// Stock adjustment
router.post('/:id/adjust', inventoryController.adjustStock.bind(inventoryController));

export default router;