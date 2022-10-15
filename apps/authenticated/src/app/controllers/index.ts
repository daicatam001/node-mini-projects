import { errorHandler } from "apps/authenticated/src/app/helpers";
import Profile from "apps/authenticated/src/app/models/profile";
import User from "apps/authenticated/src/app/models/user";
import { environment } from "apps/authenticated/src/environments/environment";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export const signup = errorHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const foundUser = await User.findOne({ email });
  if (foundUser) {
    return res.status(400).json({
      success: false,
      message: "EMAIL_EXISTED",
    });
  }
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
  const user = await User.create({
    email,
    password: hashedPassword,
  });
  const profile = await Profile.create({
    name,
    email,
    userId: user._id,
  });
  const publicProfile = profile.toData();
  const token = jwt.sign(
    {
      data: publicProfile,
    },
    environment.secretToken,
    { expiresIn: 60 * 5 }
  );
  return res.status(200).json({
    success: true,
    data: {
      user: publicProfile,
      token: token,
    },
  });
});
