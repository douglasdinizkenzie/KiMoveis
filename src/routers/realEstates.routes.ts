import { Router } from "express";
import {
  createRealEstateController,
  listAllRealEstateController,
} from "../controllers/realEstate.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { createRealEstateSchema } from "../schemas/realEstate.schema";

export const RealEstatelRoutes: Router = Router();

RealEstatelRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(createRealEstateSchema),
  createRealEstateController
);

RealEstatelRoutes.get("", listAllRealEstateController);
