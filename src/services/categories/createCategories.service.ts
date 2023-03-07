import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  tCategory,
  tCreateCategory,
} from "../../interfaces/categories.interface";
import { categorySchema } from "../../schemas/categories.schema";

export const createCategoriesService = async (
  data: tCreateCategory
): Promise<tCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const category = categoryRepository.create(data);
  await categoryRepository.save(category);
  const newCategory: tCategory = categorySchema.parse(category);
  return newCategory;
};
