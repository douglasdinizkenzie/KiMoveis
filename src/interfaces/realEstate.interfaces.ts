import { z } from "zod";
import {
  createRealEstateSchema,
  realEstadeSchema,
  realEstadeSchemaArray,
} from "../schemas/realEstate.schema";

export type tCreateRealEstate = z.infer<typeof createRealEstateSchema>;
export type tRealEstate = z.infer<typeof realEstadeSchema>;
export type tRealEstateArray = z.infer<typeof realEstadeSchemaArray>;
