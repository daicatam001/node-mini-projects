import { errorHandler } from "apps/authenticated/src/app/helpers";
import { Request, Response } from "express";

export const signup = errorHandler((req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    data: { name: "tom" },
  });
});
