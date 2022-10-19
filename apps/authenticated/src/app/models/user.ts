import { Model, model, Schema, Types } from "mongoose";
import { IAccount } from "./account";

export interface IUser {
  id: string;
  _id: string;
  email: string;
  name: string;
  accountId: IAccount;
}

export interface IUserMethods {
  toData: () => IUser;
}

export type IUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, IUserModel, IUserMethods>(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    accountId: {
      type: Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toData = function () {
  const data = this.toJSON({ virtuals: true, id: true });
  delete data.accountId;
  delete data.__v;
  return data;
};

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
