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
  user?: JwtPayload
}
// interface IDecodeTokenResult {
//   exp: number;
//   iat: number;
//   id: Types.ObjectId;
//   roles: string[];
// }

// exp:1641151562
// iat:1641065162
// id:'61c87cef7b1df7831cc03546'
// roles:(1) ['USER']
// 0:'USER'