import { environment } from "apps/authenticated/src/environments/environment";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export const authorize = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = jwt.verify(token, environment.secretToken);
    req.user = decodeToken.user;
    req.token = token
    next();
  } catch (e) {
    res.status(401).json({
      error: "Unauthenticated",
    });
  }
};
