import { verify } from 'jsonwebtoken';
import { Request, Response } from 'express';
import OrderService from '../service/order.service';
import ProductService from '../service/product.service';
// import IPayload from '../interfaces/Payload';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.orderService.getAll();

    return res.status(200).json(result);
  };

  public create = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    
    const { productsIds } = req.body;

    const { userId } = verify(authorization as string, JWT_SECRET) as never;
    
    const createdId = await this.orderService.create(userId);

    const productService = new ProductService();
    await productService.update(productsIds, createdId);

    res.status(201).json({ userId, productsIds });
  };
}

export default OrdersController;