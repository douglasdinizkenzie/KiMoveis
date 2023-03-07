import { Router } from "express";
import { loginController } from "../controllers/login.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../schemas/login.schema";

export const loginRouters: Router = Router();

loginRouters.post(
  "",
  ensureDataIsValidMiddleware(loginSchema),
  loginController
);
