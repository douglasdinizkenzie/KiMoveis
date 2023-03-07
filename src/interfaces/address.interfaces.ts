import { z } from "zod";
import { addresSchema, createAddresSchema } from "../schemas/address.schema";

export type tCreateAddress = z.infer<typeof createAddresSchema>;
export type tAddress = z.infer<typeof addresSchema>;
