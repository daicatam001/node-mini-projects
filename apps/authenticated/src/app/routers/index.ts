import {
  findAuth,
  login,
  refreshToken,
  resetPassword,
  signup,
} from "apps/authenticated/src/app/controllers";
import { authorize } from "apps/authenticated/src/app/middlewares";
import * as express from "express";
const router = express.Router();

router.post("/login", login);
router.post("/sign-up", signup);
router.get("/auth", authorize, findAuth);
router.post("/refresh-token", refreshToken);
router.post("/reset-password", resetPassword);
export default router;
