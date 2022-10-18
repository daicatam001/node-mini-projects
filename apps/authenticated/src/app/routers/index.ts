import { findAuth, signup } from "apps/authenticated/src/app/controllers";
import { authorize } from "apps/authenticated/src/app/middlewares";
import * as express from "express";
const router = express.Router();

router.post("/sign-up", signup);
router.get("/auth", authorize, findAuth);
export default router;
