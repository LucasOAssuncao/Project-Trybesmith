import connection from '../models/connection';
import ProductModel from '../models/product.model';
import IProduct from '../interfaces/Product';

class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<IProduct[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(name: string, amount: string): Promise<IProduct> {
    const product = await this.model.create(name, amount);

    return product;
  }

  public async update(productsId: number[], orderId: number): Promise<number[]> {
    const productsIds = await Promise.all(productsId.map(async (id) => {
      const productId = await this.model.update(id, orderId);
      return productId;
    }));
    return productsIds;
  }
}

export default ProductService;