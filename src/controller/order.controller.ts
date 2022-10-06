import { Request, Response } from 'express';
import OrderService from '../service/order.service';

class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (req: Request, res: Response) => {
    const result = await this.orderService.getAll();

    return res.status(200).json(result);
  };
}

export default OrdersController;