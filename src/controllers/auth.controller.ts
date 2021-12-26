import { RerquestExpressValidator, TRequest } from '../types/common';
import { Response, Request } from 'express';
import bcryptjs from 'bcryptjs';
import User from '../models/user.model';
import Role from '../models/role.model';
import { IUser } from 'src/types/auth';
import { validationResult } from 'express-validator';
import { Types } from 'mongoose';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface IAuthController {
  users(req: TRequest<{}, {}>, res: Response): Promise<Response<any, Record<string, any>>>;
  registaration(req: RerquestExpressValidator<IUser>, res: Response): Promise<Response<any, Record<string, any>>>;
}

class AuthController implements IAuthController {
  public registaration = async (req: RerquestExpressValidator<IUser>, res: Response) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'Registartion errors', errors });
      }

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

  public login = async (req: TRequest<Omit<IUser, 'roles'>, {}>, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (!user) return res.status(400).json({ message: `Didnt find user ${username}` });

      const isValidPassword = await bcryptjs.compare(password, user.password);

      if (!isValidPassword) return res.status(400).json({ message: 'Incorect password' });

      const token = this.generateToken(user._id, user.roles);

      return res.status(200).json({ message: 'Login succesfful', token });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Login error' });
    }
  };

  public users = async (req: TRequest<{}, {}>, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

  private generateToken = (id: Types.ObjectId, roles: string[]): string => {
    return jwt.sign({ id, roles }, process.env.TOKEN_SECRET_KEY as Secret, { expiresIn: '24h' });
  };
}

export default new AuthController();
