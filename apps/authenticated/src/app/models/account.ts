import { model, Schema } from "mongoose";

export interface IAccount {
  id: string;
  _id: string;
  email: string;
  password: string;
}


const accountSchema = new Schema<IAccount>(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Account = model("Account", accountSchema);
export default Account;
