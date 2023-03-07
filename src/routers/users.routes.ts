import { Router } from "express";
import {
  createUserController,
  listAllUsersController,
  softDeleteUserController,
  updateUserController,
} from "../controllers/users.controllers";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureEmailDontExistMiddleware } from "../middlewares/ensureEmailDontExists.middleware";
import { ensureIsAdminMiddleware } from "../middlewares/ensureIsAdmin.middleware";
import { ensurePermitionUserMiddleware } from "../middlewares/ensurePermitionUser.middleware";
import { ensureTokenIsValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExits.middleware";
import { createUserSchema, userSchemaUpdate } from "../schemas/users.schema";

export const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  ensureEmailDontExistMiddleware,
  createUserController
);

usersRoutes.get(
  "",
  ensureTokenIsValidMiddleware,
  ensureIsAdminMiddleware,
  listAllUsersController
);

usersRoutes.patch(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensurePermitionUserMiddleware,
  ensureDataIsValidMiddleware(userSchemaUpdate),
  updateUserController
);

usersRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistsMiddleware,
  ensureIsAdminMiddleware,
  softDeleteUserController
);
