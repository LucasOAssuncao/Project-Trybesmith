import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import connection from '../models/connection';
import UserModel from '../models/user.model';
import IToken from '../interfaces/Token';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(
    username: string,
    classe: string,
    level: number,
    password: string,
  ): Promise<IToken> {
    await this.model.create(username, classe, level, password);
    
    const token = await this.login(username, password);
    
    return token as IToken;
  }

  public async login(username: string, password: string): Promise<IToken> {
    const log = await this.model.login(username, password);
        
    const payload = { userId: log.id };
    const token = jwt.sign(
      payload,
      JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '1d' },
    );
    
    return token as unknown as IToken;
  }
}

export default UserService;