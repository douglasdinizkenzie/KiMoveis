import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureTokenIsValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let tokenUser = req.headers.authorization;
  if (!tokenUser) {
    throw new AppError("Missing bearer token", 401);
  }

  tokenUser = tokenUser.split(" ")[1];

  jwt.verify(tokenUser, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      admin: decoded.admin,
      id: parseInt(decoded.sub),
    };
  });

  return next();
};
