import { Request, Response, NextFunction } from 'express';
import connection from '../models/connection';
import UserModel from '../models/user.model';

class ValidateLogin {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public validateLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({ message: '"username" is required' });
    }

    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }

    const log = await this.model.login(username, password);

    if (!log) {
      return res.status(401).json({ message: 'Username or password invalid' });
    }
    next();
  };
}

export default ValidateLogin;