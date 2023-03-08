import { DeepPartial } from "typeorm";
import { z } from "zod";
import {
  createUserSchema,
  userSchema,
  userSchemaArray,
} from "../schemas/users.schema";

export type tCreateUser = z.infer<typeof createUserSchema>;
export type tUser = z.infer<typeof userSchema>;
export type tUserArray = z.infer<typeof userSchemaArray>;
export type tUserUpdate = DeepPartial<tCreateUser>;
