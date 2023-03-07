import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { AppError } from "../errors";

export const ensureCategoryExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const idCategory: number = Number(req.params.id);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category = await categoryRepository.findOne({
    where: {
      id: idCategory,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return next();
};
