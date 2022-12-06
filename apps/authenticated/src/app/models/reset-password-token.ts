import { IAccount } from "apps/authenticated/src/app/models/account";
import { IUser } from "apps/authenticated/src/app/models/user";
import { environment } from "apps/authenticated/src/environments/environment";
import { addSeconds } from "date-fns";
import { model, Model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IResetPasswordToken {
  token: string;
  account: IAccount;
  expireAt: Date;
}

export interface IResetPasswordTokenModel
  extends Model<IResetPasswordToken, {}, IResetPasswordTokenMethods> {
  createToken: (account: IAccount) => Promise<IResetPasswordToken>;
}

export interface IResetPasswordTokenMethods {
  isExpired: () => boolean;
}

const resetPasswordTokenSchema = new Schema<
  IResetPasswordToken,
  IResetPasswordTokenModel,
  IResetPasswordTokenMethods
>(
  {
    token: {
      type: String,
    },
    expireAt: {
      type: Date,
    },
    account: {
      type: Types.ObjectId,
      ref: "Account",
    },
  },
  {
    timestamps: true,
    collection: "reset-password-tokens",
  }
);

resetPasswordTokenSchema.static("createToken", function (account: IAccount) {
  const expireAt = addSeconds(new Date(), environment.resetPasswordTokenExpire);
  const token = uuidv4();
  return this.create({
    account: account._id,
    token,
    expireAt,
  });
});
resetPasswordTokenSchema.methods.isExpired = function () {
  return new Date(this.expireAt).getTime() < Date.now();
};

const ResetPasswordToken = model<IResetPasswordToken, IResetPasswordTokenModel>(
  "ResetPasswordToken",
  resetPasswordTokenSchema
);
export default ResetPasswordToken;
