import { signup } from "apps/authenticated/src/app/controllers";
import * as express from "express";
const router = express.Router();

router.post("/api/sign-up", signup);
 
export default router