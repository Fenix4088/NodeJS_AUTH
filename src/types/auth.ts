import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { TRequest } from "./common";

// * user
export interface IUser {
  username: string;
  password: string;
  roles: string[];
}

// * role
export interface IRole {
  value: string;
}

// * decode token result

export type RequestWithJWTPayload = TRequest<{}, {}> & {
  user?: JwtPayload | string;
}
