import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

export const ensureUserExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const idUser = Number(req.params.id);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};
