import { Request, Response } from 'express';
import UserService from '../service/user.service';

class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const { username, classe, level, password } = req.body;

    const token = await this.userService.create(username, classe, level, password);

    return res.status(201).json({ token });
  };

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const token = await this.userService.login(username, password);

    return res.status(200).json({ token });
  };
}

export default UserController;
