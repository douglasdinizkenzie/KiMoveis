import { loginSchema } from "../schemas/login.schema";
import { z } from "zod";

export type tLogin = z.infer<typeof loginSchema>;
