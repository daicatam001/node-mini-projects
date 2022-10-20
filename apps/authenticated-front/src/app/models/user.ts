export interface IUser {
  id: string;
  name: string;
  email: string;
}

export type IUserSignUp = Pick<IUser, "name" | "email"> & { password: string };

export type IUserLogin = Pick<IUser, "email"> & { password: string };
export interface IAuth {
  token?: string | null;
  refreshToken?: string | null;
  user?: IUser | null;
}
