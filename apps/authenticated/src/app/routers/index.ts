import {
  findAuth,
  login,
  refreshToken,
  resetPassword,
  getResetPasswordTokenStatus,
  signup,
  changePasswordByToken,
  updateUser,
  changePassword,
} from "apps/authenticated/src/app/controllers";
import { authorize } from "apps/authenticated/src/app/middlewares";
import * as express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/sign-up", signup);
router.get("/auth", authorize, findAuth);
router.post("/refresh-token", refreshToken);
router.post("/reset-password", resetPassword);
router.post("/change-password/token/:token", changePasswordByToken);
router.get("/reset-password/:token/status", getResetPasswordTokenStatus);
router.put("/user", authorize, updateUser);
router.post("/change-password", authorize, changePassword);
export default router;
