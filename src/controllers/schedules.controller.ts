import { Request, Response } from "express";
import { createSchedulesService } from "../services/schedules/createSchedule.service";
import { listAllSchedulePerRealEstateService } from "../services/schedules/listAllSchedulesPerRealEstate.service";

export const createSchedulesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idUser: number = Number(req.user.id);
  const { realEstateId, ...rest } = req.body;
  await createSchedulesService(rest, idUser, realEstateId);

  return res.status(201).json({
    message: "Schedule created",
  });
};

export const listAllSchedulePerRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const idParams = Number(req.params.id);
  const realEstates = await listAllSchedulePerRealEstateService(idParams);
  return res.status(200).json(realEstates);
};
