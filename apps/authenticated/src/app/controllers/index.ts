import { errorHandler } from "apps/authenticated/src/app/helpers";
import Account from "apps/authenticated/src/app/models/account";
import RefreshToken from "apps/authenticated/src/app/models/refresh-token";
import ResetPasswordToken from "apps/authenticated/src/app/models/reset-password-token";
import User from "apps/authenticated/src/app/models/user";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Document } from "mongoose";
import { environment } from "../../environments/environment";
import { sendMail } from "../utils/nodemailer";

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
    account: account._id,
  });
  const refreshToken = await RefreshToken.createToken(user.toData());
  return res.status(200).json({
    success: true,
    data: {
      user: user.toData(),
      token: refreshToken.jwtToken,
      refreshToken: refreshToken.token,
    },
  });
});

export const login = errorHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "UNAUTHORIZED",
    });
  }
  const checkingAccount = await Account.findOne({ email });
  if (!checkingAccount) {
    return res.status(400).json({
      success: false,
      error: "UNAUTHORIZED",
    });
  }
  try {
    const result = await bcrypt.compare(password, checkingAccount.password);
    if (!result) {
      return res.status(400).json({
        success: false,
        error: "UNAUTHORIZED",
      });
    }
    const user = await User.findOne({ account: checkingAccount._id });
    const refreshToken = await RefreshToken.createToken(user.toData());
    return res.status(200).json({
      success: true,
      data: {
        user: user.toData(),
        token: refreshToken.jwtToken,
        refreshToken: refreshToken.token,
      },
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      error: "UNAUTHORIZED",
    });
  }
});

export const findAuth = errorHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (user) {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  }
  return res.status(400).json({
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
    let checkingRefreshToken = await RefreshToken.findOne({
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
    const user = await User.findById(checkingRefreshToken.user);
    const savedRefreshToken = await checkingRefreshToken.renewToken(
      user.toData()
    );
    return res.status(200).json({
      success: true,
      data: savedRefreshToken.jwtToken,
    });
  }
);

export const resetPassword = errorHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      return res.status(200).json({
        success: true,
        data: {
          resetPasswordToken: "",
        },
      });
    }

    const foundAccount = await Account.findOne({ email });
    if (!foundAccount) {
      return res.status(200).json({
        success: true,
        data: {
          resetPasswordToken: "",
        },
      });
    }
    await sendMail(
      environment.mailSender,
      "tampt95@gmail.com",
      "Reset password",
      "reset password"
    );
    const resetPasswordToken = await ResetPasswordToken.createToken(
      foundAccount
    );
    return res.status(200).json({
      success: true,
      data: {
        resetPasswordToken: resetPasswordToken.token,
      },
    });
  }
);

export const getResetPasswordTokenStatus = errorHandler(async (req, res) => {
  const { token } = req.params;
  const resetPwToken = await ResetPasswordToken.findOne({ token });
  if (!resetPwToken) {
    return res.status(400).json({
      success: false,
      error: "TOKEN_NOT_FOUND",
    });
  }
  if (resetPwToken.isExpired()) {
    return res.status(400).json({
      success: false,
      error: "TOKEN_IS_EXPIRED",
    });
  }
  return res.status(200).json({
    success: true,
    status: "OK",
  });
});

export const changePasswordByToken = errorHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const resetPwToken = await ResetPasswordToken.findOne({ token });
  if (!resetPwToken) {
    return res.status(400).json({
      success: false,
      error: "TOKEN_NOT_FOUND",
    });
  }

  const account = await Account.findById(resetPwToken.account);

  if (!account) {
    return res.status(400).json({
      success: false,
      error: "ACCOUNT_NOT_FOUND",
    });
  }
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

  account.password = hashedPassword;
  await resetPwToken.delete();
  await account.save();

  return res.status(200).json({
    success: true,
    status: "OK",
  });
});

export const changePassword = errorHandler(async (req, res) => {
  const { password } = req.body;
  console.log(password)
  const { account } = await User.findById(req.user!.id).populate("account");
  if (!account) {
    return res.status(400).json({
      success: false,
      error: "ACCOUNT_NOT_FOUND",
    });
  }
  const hashedPassword = await new Promise<string>((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });

  account.password = hashedPassword;
  await ((account as unknown) as Document).save();

  return res.status(200).json({
    success: true,
    status: "OK",
  });
});

export const updateUser = errorHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({
      success: false,
      message: "NAME_IS_REQUIRED",
    });
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      description,
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    data: user.toData(),
  });
});
