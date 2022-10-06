import { Pool, ResultSetHeader } from 'mysql2/promise';
import IProduct from '../interfaces/Product';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(name: string, amount: string): Promise<IProduct> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const { insertId } = result;
    return { id: insertId, name, amount };
  }
}
