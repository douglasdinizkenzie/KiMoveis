import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors";

export const ensureIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userAdmin = req.user.admin;

  if (!userAdmin) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
