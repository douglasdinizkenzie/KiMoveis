import { Request, Response } from "express";
import { tRealEstate } from "../interfaces/realEstate.interfaces";
import { createRealEstateService } from "../services/realEstates/createRealEstate.service";
import { listAllRealEstateService } from "../services/realEstates/listAllRealStates.service";

export const createRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { categoryId, ...rest } = req.body;
  const newRealEstate: tRealEstate = await createRealEstateService(
    categoryId,
    rest
  );
  return res.status(201).json(newRealEstate);
};

export const listAllRealEstateController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const realEstates: tRealEstate[] = await listAllRealEstateService();
  return res.status(200).json(realEstates);
};
