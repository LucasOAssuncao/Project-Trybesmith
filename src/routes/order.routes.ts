import { Router } from 'express';
import OrderController from '../controller/order.controller';

const router = Router();
const orderController = new OrderController();

router.get('/orders', orderController.getAll);

export default router;