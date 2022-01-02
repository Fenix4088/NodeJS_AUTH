import { NextFunction } from 'express-serve-static-core';
import { Response } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RequestWithJWTPayload } from 'src/types/auth';
import { TRequest } from 'src/types/common';
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

export const roleMiddleware = (roles: string[]) => (req: TRequest<{}, {}>, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') next();

  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(403).json({ message: 'User not authorized!' });

    const {roles: userRoles} = jwt.verify(token, process.env.TOKEN_SECRET_KEY as Secret) as JwtPayload;

    let hasRole = false;

    (userRoles as string[]).forEach(role => {
      if(roles.includes(role)) hasRole = true;
    });

    if(!hasRole) return res.status(403).json({ message: 'You have no access!' });

    next();

  } catch (error) {
    return res.status(403).json({ message: 'User not authorized!' });
  }
};
