import { errorHandler } from "apps/authenticated/src/app/helpers";
import User from "apps/authenticated/src/app/models/user";
import RefreshToken from "apps/authenticated/src/app/models/refresh-token";
import Account from "apps/authenticated/src/app/models/account";
import { environment } from "apps/authenticated/src/environments/environment";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

export const signup = errorHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "MISSING_REQUIRED_DATA",
    });
  }
  const foundAccount = await Account.findOne({ email });
  if (foundAccount) {
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
  const account = await Account.create({
    email,
    password: hashedPassword,
  });
  const user = await User.create({
    name,
    email,
    accountId: account._id,
  });
  const publicUser = user.toData();
  const jwtToken = jwt.sign(
    {
      user: publicUser,
    },
    environment.secretToken,
    { expiresIn: environment.jwtTokenExpire }
  );
  const refreshToken = await RefreshToken.createToken(jwtToken, publicUser._id);
  return res.status(200).json({
    success: true,
    data: {
      user: publicUser,
      token: jwtToken,
      refreshToken: refreshToken.token,
    },
  });
});

export const findAuth = errorHandler(async (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  }
  return res.status(500).json({
    success: false,
    error: "UNAUTHORIZED",
  });
});

export const refreshToken = errorHandler(
  async (req: Request, res: Response) => {
    const { refreshToken, token } = req.body;
    if (!refreshToken) {
      return res.status(403).json({
        success: false,
        error: "EMPTY_REFRESH_TOKEN",
      });
    }
    const checkingRefreshToken = await RefreshToken.findOne({
      jwtToken: token,
      token: refreshToken,
    });
    if (!checkingRefreshToken) {
      return res.status(403).json({
        success: false,
        error: "INVALID_REFRESH_TOKEN",
      });
    }
    if (checkingRefreshToken.isExpired()) {
      return res.status(403).json({
        success: false,
        error: "REFRESH_TOKEN_EXPIRED",
      });
    }
    const user = await User.findById(checkingRefreshToken.userId);
    const jwtToken = jwt.sign(
      {
        user: user.toData(),
      },
      environment.secretToken,
      { expiresIn: environment.jwtTokenExpire }
    );
    return res.status(200).json({
      success: true,
      data: jwtToken,
    });
  }
);
