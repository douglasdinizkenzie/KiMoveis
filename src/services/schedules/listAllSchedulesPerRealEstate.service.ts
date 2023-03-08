import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

export const listAllSchedulePerRealEstateService = async (idParams: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateExist: RealEstate | null = await realEstateRepository.findOne(
    {
      where: {
        id: idParams,
      },
    }
  );
  if (!realEstateExist) {
    throw new AppError("RealEstate not found", 404);
  }

  const realEstate: RealEstate | null = await realEstateRepository
    .createQueryBuilder("realestate")
    .leftJoinAndSelect("realestate.address", "address")
    .leftJoinAndSelect("realestate.category", "category")
    .leftJoinAndSelect("realestate.schedules", "schedules")
    .leftJoinAndSelect("schedules.user", "user")
    .where("realestate.id = :id", { id: idParams })
    .getOne();

  realEstate!.schedules.forEach((schedule) => {
    schedule.date = new Date(schedule.date).toISOString().substr(0, 10);
  });

  return realEstate;
};
