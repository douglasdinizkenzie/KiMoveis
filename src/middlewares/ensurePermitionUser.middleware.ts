import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";

export const ensurePermitionUserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAdmin = req.user.admin;
  const idUser = Number(req.user.id);
  const idParams = Number(req.params.id);

  if (!isAdmin && idUser !== idParams) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
