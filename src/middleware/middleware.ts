import { NextFunction } from 'express-serve-static-core';
import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestWithJWTPayload } from 'src/types/auth';
dotenv.config();

export const authMiddleware = (req: RequestWithJWTPayload, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'User not authorized!' });

    const decodedData = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret);

    req.user = decodedData;

    next();

  } catch (error) {
    return res.status(403).json({ message: 'User not authorized!' });
  }
};

export const roleMiddleware = (req: any, res: Response, next:NextFunction) => {
  
}
