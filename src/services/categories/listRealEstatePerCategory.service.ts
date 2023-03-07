import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

export const listRealEstatePerCategoryServce = async (idParams: number) => {
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

  return categories;
};
