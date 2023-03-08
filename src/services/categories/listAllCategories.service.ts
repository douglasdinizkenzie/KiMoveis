import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tCategoryArray } from "../../interfaces/categories.interface";
import { categoryArraySchema } from "../../schemas/categories.schema";

export const listAllCategoriesService = async (): Promise<tCategoryArray> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categories: Category[] = await categoryRepository.find();
  const categoriesFormat: tCategoryArray =
    categoryArraySchema.parse(categories);
  return categoriesFormat;
};
