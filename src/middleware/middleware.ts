import { NextFunction } from 'express-serve-static-core';
import { IUser, RequestWithUserDataFromToken } from 'src/types/auth';
import { TRequest } from 'src/types/common';
import { Response, Request } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req: RequestWithUserDataFromToken, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'User not authorized!' });

    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret);

    req.user = {
      
    }
    next();

  } catch (error) {
    return res.status(403).json({ message: 'User not authorized!' });
  }
};
