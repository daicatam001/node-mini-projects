import { IUser } from "apps/authenticated/src/app/models/user";
import { environment } from "apps/authenticated/src/environments/environment";
import { addSeconds } from "date-fns";
import { model, Model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IResetPasswordToken {
  token: string;
  userId: IUser;
  expireAt: Date;
}

export interface IResetPasswordTokenModel
  extends Model<IResetPasswordToken, {}, IResetPasswordTokenMethods> {
  createToken: (user: IUser) => Promise<IResetPasswordToken>;
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
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    collection: "ResetPassword-tokens",
  }
);

resetPasswordTokenSchema.static("createToken", function (user: IUser) {
  const expireAt = addSeconds(new Date(), environment.resetPasswordTokenExpire);
  const token = uuidv4();
  return this.create({
    userId: user._id,
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
