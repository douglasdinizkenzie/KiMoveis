import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureEmailDontExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const emailUserRequest = req.body.email;
  const emailUser: User | null = await userRepository.findOne({
    where: {
      email: emailUserRequest,
    },
  });

  if (emailUser) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};
