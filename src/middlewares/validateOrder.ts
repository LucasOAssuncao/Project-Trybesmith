import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class ValidateOrder {
  public validateProductId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const productsId: [] = req.body.productsIds;
    
    if (!productsId) return res.status(400).json({ message: '"productsIds" is required' });
    if (!Array.isArray(productsId)) {
      return res.status(422).json({ message: '"productsIds" must be an array' });
    }
    if (!productsId.length) {
      return res.status(422).json({ message: '"productsIds" must include only numbers' });
    }
    next();
  };

  public validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    const userModel = new UserModel(connection);

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      const { userId } = verify(authorization as string, JWT_SECRET) as never;
      const [user] = await userModel.getById(userId);
      if (user) next();
    } catch (e) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
export default ValidateOrder;