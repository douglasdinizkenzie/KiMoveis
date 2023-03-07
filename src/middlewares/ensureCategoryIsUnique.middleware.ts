import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

export const ensureCategoryIsUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const nameCategory: string = req.body.name;
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: {
      name: nameCategory,
    },
  });

  if (category) {
    throw new AppError("Category already exists", 409);
  }

  return next();
};
