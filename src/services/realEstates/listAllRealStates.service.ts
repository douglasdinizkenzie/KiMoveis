import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { tRealEstate } from "../../interfaces/realEstate.interfaces";

export const listAllRealEstateService = async (): Promise<tRealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const realEstate: RealEstate[] = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });
  return realEstate;
};
