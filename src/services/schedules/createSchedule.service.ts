import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { tCreateScheduleWithoutRealEstate } from "../../interfaces/schedules.interfaces";

export const createSchedulesService = async (
  data: tCreateScheduleWithoutRealEstate,
  idUser: number,
  RealEstateId: number
): Promise<void> => {
  const scheduleRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const userData: User | null = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const realEstateExist: RealEstate | null = await realEstateRepository.findOne(
    {
      where: {
        id: RealEstateId,
      },
    }
  );

  if (!realEstateExist) {
    throw new AppError("RealEstate not found", 404);
  }

  const hourFormat = `${data.hour}:00`;
  const hourNumber = Number(hourFormat.split(":")[0]);

  if (hourNumber < 8 || hourNumber >= 18) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const parsedDateObject = new Date(data.date);
  const dayOfWeek = parsedDateObject.getDay();

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }

  const existSchedule: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :date", { date: parsedDateObject })
    .andWhere("schedule.hour = :hour", { hour: data.hour })
    .andWhere("schedule.realEstate = :realestate", {
      realestate: RealEstateId,
    })
    .getOne();

  if (existSchedule) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

  const existUserSchedule: Schedule | null = await scheduleRepository
    .createQueryBuilder("schedule")
    .where("schedule.date = :dateParams", { dateParams: parsedDateObject })
    .andWhere("schedule.hour = :hourParams", { hourParams: data.hour })
    .andWhere("schedule.user.id = :user", { user: userData!.id })
    .getOne();

  if (existUserSchedule) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  const schedule = scheduleRepository.create({
    date: parsedDateObject,
    hour: hourFormat,
    realEstate: realEstateExist,
    user: userData!,
  });

  await scheduleRepository.save(schedule);

  return;
};
