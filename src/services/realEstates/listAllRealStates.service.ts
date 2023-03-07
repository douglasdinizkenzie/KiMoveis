import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import {
  tRealEstate,
  tRealEstateArray,
} from "../../interfaces/realEstate.interfaces";
import { realEstadeSchemaArray } from "../../schemas/realEstate.schema";

export const listAllRealEstateService = async (): Promise<tRealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const realEstate = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });
  return realEstate;
};
