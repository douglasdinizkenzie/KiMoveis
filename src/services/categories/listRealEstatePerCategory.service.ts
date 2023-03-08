import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { tRealEstatePerCategory } from "../../interfaces/categories.interface";
import { realEstatePerCategory } from "../../schemas/categories.schema";

export const listRealEstatePerCategoryServce = async (
  idParams: number
): Promise<tRealEstatePerCategory> => {
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const categories: Category | null = await categoryRepository.findOne({
    where: {
      id: idParams,
    },
    relations: {
      realEstate: true,
    },
  });

  const categoriesFormat: tRealEstatePerCategory =
    realEstatePerCategory.parse(categories);
  console.log(categoriesFormat);

  return categoriesFormat;
};
