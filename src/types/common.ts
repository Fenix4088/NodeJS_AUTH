import { Request } from 'express';
import { Types, Document } from 'mongoose';
import { FileArray } from 'express-fileupload';

// * Simle request with body
export interface TypedRequestBody<T = any> extends Request {
  body: T;
}

// * Request with files
export type TRequest<ReqBody, ReqQuery, WithFile = false> = Request<{}, {}, ReqBody, ReqQuery> & WithFileType<WithFile>;

type WithFileType<C> = C extends true
  ? {
      files?: FileArray;
    }
  : {};

export type DocumentedObject<T> = Document<any, any, T> &
  T & {
    _id: Types.ObjectId;
  };

  // * Request with Validation(express validator)
  export type RerquestExpressValidator<Body = any> = Request<Record<string, any> | undefined, any, Body, Record<string, any> | undefined, Record<string, any>>

