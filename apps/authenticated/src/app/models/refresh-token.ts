import { IUser } from "apps/authenticated/src/app/models/user";
import { environment } from "apps/authenticated/src/environments/environment";
import { addSeconds } from "date-fns";
import { Model, model, Schema, Types } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IRefreshToken {
  token: string;
  jwtToken: string;
  userId: IUser;
  expireAt: Date;
}

export interface IRefreshTokenModel
  extends Model<IRefreshToken, {}, IRefreshTokenMethods> {
  createToken: (jwtToken: string, userId: string) => Promise<IRefreshToken>;
}

export interface IRefreshTokenMethods {
  isExpired: () => boolean;
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

refreshTokenSchema.static(
  "createToken",
  function (jwtToken: string, userId: string) {
    const expireAt = addSeconds(new Date(), environment.refreshTokenExpire);
    const _refreshToken = uuidv4();
    return this.create({
      jwtToken,
      userId,
      token: _refreshToken,
      expireAt,
    });
  }
);

refreshTokenSchema.methods.isExpired = function () {
  return new Date(this.expireAt).getTime() > Date.now();
};

const RefreshToken = model<IRefreshToken, IRefreshTokenModel>(
  "RefreshToken",
  refreshTokenSchema
);
export default RefreshToken;
