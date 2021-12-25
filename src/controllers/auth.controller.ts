import { TRequest } from '../types/common';
import { Response } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import Role from '../models/role.model';

import { IUser } from 'src/types/auth';
interface IAuthController {
  users(req: TRequest<{}, {}>, res: Response): Promise<Response<any, Record<string, any>>>;
  registaration(req: TRequest<IUser, {}>, res: Response): Promise<Response<any, Record<string, any>>>;
}

class AuthController implements IAuthController {
  public registaration = async (req: TRequest<IUser, {}>, res: Response) => {
    try {
      const { username, password } = req.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        return res.status(401).json({ message: `User: "${username}" already excisted` });
      }

      const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));

      const userRole = await Role.findOne({ role: 'USER' });

      const user = new User({ username, password: hashedPassword, roles: [userRole?.value] });

      await user.save();

      return res.status(200).json({ message: `User "${username}" was created`, user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Registration error' });
    }
  };

  public login = async (req: TRequest<{}, {}>, res: Response) => {
    try {
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Login error' });
    }
  };

  public users = async (req: TRequest<{}, {}>, res: Response) => {
    try {
      return res.status(200).json('users');
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
}

export default new AuthController();
