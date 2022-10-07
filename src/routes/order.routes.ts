import { Router } from 'express';
import OrderController from '../controller/order.controller';
import ValidateOrder from '../middlewares/validateOrder';

const router = Router();
const orderController = new OrderController();
const validateOrder = new ValidateOrder();

router.get('/orders', orderController.getAll);
router.post(
  '/orders',
  validateOrder.validateToken,
  validateOrder.validateProductId,
  orderController.create,
);

export default router;
