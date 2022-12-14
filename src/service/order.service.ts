import connection from '../models/connection';
import OrderModel from '../models/order.model';
import IOrder from '../interfaces/Order';

class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public async getAll(): Promise<IOrder[]> {
    const result = await this.model.getAll();

    return result;
  }

  public async create(id: number): Promise<number> {
    const createdId = await this.model.create(id);

    return createdId;
  }
}

export default OrderService;