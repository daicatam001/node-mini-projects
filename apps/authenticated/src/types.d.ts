import { IUser } from 'apps/authenticated/src/app/models/user';

export { };

declare global {
  namespace Express {
    export interface Request {
      user?: IUser;
    }
  }
}
