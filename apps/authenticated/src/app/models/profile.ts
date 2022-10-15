import { Model, model, Schema, Types } from "mongoose";

export interface IProfile {
  email: string;
  name: string;
  userId: string;
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
  return data;
};

const Profile = model("Profile", profileSchema);
export default Profile;
