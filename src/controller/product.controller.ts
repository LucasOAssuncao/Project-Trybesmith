import { Request, Response } from 'express';
import ProductService from '../service/product.service';

class ProductController {
  constructor(private productService = new ProductService()) {}

  public getAll = async (_req: Request, res: Response) => {
    const user = await this.productService.getAll();
    res.status(200).json(user);
  };

  public create = async (req: Request, res: Response) => {
    const { name, amount } = req.body;

    const productCreated = await this.productService.create(name, amount);
    res.status(201).json(productCreated);
  };
}

export default ProductController;
