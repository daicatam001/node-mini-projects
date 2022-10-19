import {
  findAuth,
  refreshToken,
  signup,
} from "apps/authenticated/src/app/controllers";
import { authorize } from "apps/authenticated/src/app/middlewares";
import * as express from "express";
const router = express.Router();

router.post("/sign-up", signup);
router.get("/auth", authorize, findAuth);
router.post("/refresh-token", refreshToken);
export default router;
