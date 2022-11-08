import { IUser } from "apps/authenticated/src/app/models/user";
import { environment } from "apps/authenticated/src/environments/environment";
import { addSeconds } from "date-fns";
import { Model, model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";
import * as jwt from "jsonwebtoken";
export interface IRefreshToken {
  token: string;
  jwtToken: string;
  userId: IUser;
  expireAt: Date;
}

export interface IRefreshTokenModel
  extends Model<IRefreshToken, {}, IRefreshTokenMethods> {
  createToken: (user: IUser) => Promise<IRefreshToken>;
}

export interface IRefreshTokenMethods {
  isExpired: () => boolean;
  renewToken: (user: IUser) => Promise<IRefreshToken>;
}

const refreshTokenSchema = new Schema<
  IRefreshToken,
  IRefreshTokenModel,
  IRefreshTokenMethods
>(
  {
    token: {
      type: String,
    },
    jwtToken: {
      type: String,
      required: true,
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
    collection: "refresh-tokens",
  }
);

refreshTokenSchema.static("createToken", function (user: IUser) {
  console.log(jwt);
  const jwtToken = jwt.sign({ user }, environment.secretToken, {
    expiresIn: environment.jwtTokenExpire,
  });
  const expireAt = addSeconds(new Date(), environment.refreshTokenExpire);
  const _refreshToken = uuidv4();
  return this.create({
    jwtToken,
    userId: user._id,
    token: _refreshToken,
    expireAt,
  });
});

refreshTokenSchema.methods.isExpired = function () {
  return new Date(this.expireAt).getTime() < Date.now();
};
refreshTokenSchema.methods.renewToken = function (user: IUser) {
  const jwtToken = jwt.sign({ user }, environment.secretToken, {
    expiresIn: environment.jwtTokenExpire,
  });
  this.jwtToken = jwtToken;
  this.expireAt = addSeconds(new Date(), environment.refreshTokenExpire);
  return this.save();
};

const RefreshToken = model<IRefreshToken, IRefreshTokenModel>(
  "RefreshToken",
  refreshTokenSchema
);
export default RefreshToken;
