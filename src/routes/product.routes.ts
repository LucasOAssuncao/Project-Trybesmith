import { Router } from 'express';
import ProductController from '../controller/product.controller';
import ValidateProduct from '../middlewares/validateProduct';

const router = Router();
const productController = new ProductController();
const validateProduct = new ValidateProduct();

router.get('/products', productController.getAll);

router.post(
  '/products',
  validateProduct.validateName,
  validateProduct.validateAmount,
  productController.create,
);

export default router;
