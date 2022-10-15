import { Model, model, Schema, Types } from "mongoose";
import { IUser } from "./user";

export interface IProfile {
  email: string;
  name: string;
  userId: IUser;
}

export interface IProfileMethods {
  toData: () => IProfile;
}

export type IProfileModel = Model<IProfile, {}, IProfileMethods>;

const profileSchema = new Schema<IProfile, IProfileModel, IProfileMethods>(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

profileSchema.methods.toData = function () {
  const data = this.toJSON({ virtuals: true, id: true });
  delete data.userId;
  delete data.__v;
  delete data._id;
  return data;
};

const Profile = model<IProfile, IProfileModel>("Profile", profileSchema);
export default Profile;
