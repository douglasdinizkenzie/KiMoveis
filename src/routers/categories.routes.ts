import { Router } from "express";
import {
  createCategoryController,
  listAllCategoriesController,
  listRealEstatePerCategory,
} from "../controllers/categories.controller";
import { ensureCategoryExistsMiddleware } from "../middlewares/ensureCategoryExists.middleware";
import { ensureCategoryIsUniqueMiddleware } from "../middlewares/ensureCategoryIsUnique.middleware";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { createCategorySchema } from "../schemas/categories.schema";

export const categoriesRoutes: Router = Router();

categoriesRoutes.post(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  ensureDataIsValidMiddleware(createCategorySchema),
  ensureCategoryIsUniqueMiddleware,
  createCategoryController
);

categoriesRoutes.get("", listAllCategoriesController);
categoriesRoutes.get(
  "/:id/realEstate",
  ensureCategoryExistsMiddleware,
  listRealEstatePerCategory
);
