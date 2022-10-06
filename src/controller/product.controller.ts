import { Request, Response } from 'express';
import ProductService from '../service/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const productCreated = await this.productService.create(name, amount);
    res.status(201).json(productCreated);
  };
}

export default ProductController;
