import { environment } from "apps/authenticated/src/environments/environment";
import { addSeconds } from "date-fns";
import { Model, model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IRefreshToken {
  token: string;
  jwtToken: string;
  expireAt: Date;
}

export interface IProfileModel extends Model<IRefreshToken> {
  createToken: (jwtToken: string) => Promise<IRefreshToken>;
}

const refreshTokenSchema = new Schema<IRefreshToken, IProfileModel>(
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
  },
  {
    timestamps: true,
    collection: "refresh-tokens",
  }
);

refreshTokenSchema.static("createToken", function (jwtToken: string) {
  const expireAt = addSeconds(new Date(), environment.refreshTokenExpire);
  const _refreshToken = uuidv4();
  return this.create({
    jwtToken,
    token: _refreshToken,
    expireAt,
  });
});

const RefreshToken = model<IRefreshToken, IProfileModel>(
  "RefreshToken",
  refreshTokenSchema
);
export default RefreshToken;
