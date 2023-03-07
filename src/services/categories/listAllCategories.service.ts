import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import {
  tCategory,
  tCategoryArray,
} from "../../interfaces/categories.interface";
import { categoryArraySchema } from "../../schemas/categories.schema";

export const listAllCategoriesService = async (): Promise<tCategoryArray> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categories = await categoryRepository.find();
  const categoriesFormat = categoryArraySchema.parse(categories);
  return categoriesFormat;
};
