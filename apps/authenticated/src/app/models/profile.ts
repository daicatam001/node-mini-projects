import { model, Schema, Types } from "mongoose";
export interface IProfile {
  name: string;
}

const profileSchema = new Schema(
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
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("Profile", profileSchema);
export default Profile;
