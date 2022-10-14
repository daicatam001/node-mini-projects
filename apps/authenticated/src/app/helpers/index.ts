import { NextFunction, Request, RequestHandler, Response } from "express";

export const errorHandler = function (callback: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      callback(req, res, next);
    } catch (e) {
      return res.status(500).json({
        success: false,
        error: "Internal error",
      });
    }
  };
};
