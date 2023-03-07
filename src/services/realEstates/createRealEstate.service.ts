import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { tAddress } from "../../interfaces/address.interfaces";
import {
  tCreateRealEstate,
  tRealEstate,
} from "../../interfaces/realEstate.interfaces";
import { addresSchema } from "../../schemas/address.schema";
import { realEstadeSchema } from "../../schemas/realEstate.schema";

export const createRealEstateService = async (
  categoryId: number,
  data: tCreateRealEstate
): Promise<tRealEstate> => {
  const addressRepository: Repository<Address> =
    AppDataSource.getRepository(Address);
  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const category: Category | null = await categoryRepository.findOne({
    where: {
      id: categoryId,
    },
  });
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const addressUnique: Address | null = await addressRepository.findOne({
    where: {
      zipCode: data.address.zipCode,
    },
  });

  if (addressUnique) {
    throw new AppError("Address already exists", 409);
  }

  const createAddress: Address = addressRepository.create(data.address);
  await addressRepository.save(createAddress);
  const addressWithId: tAddress = addresSchema.parse(createAddress);

  const createRealEstate: RealEstate = realEstateRepository.create({
    value: data.value,
    size: data.size,
    address: addressWithId,
    category: category,
  });

  await realEstateRepository.save(createRealEstate);
  const newRealEstate = realEstadeSchema.parse(createRealEstate);
  return newRealEstate;
};
