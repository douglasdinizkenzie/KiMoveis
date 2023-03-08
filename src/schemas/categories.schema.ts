import { z } from "zod";
import { realEstadeSchemaArray } from "./realEstate.schema";
export const createCategorySchema = z.object({
  name: z.string(),
});

export const categorySchema = createCategorySchema.extend({
  id: z.number(),
});

export const categoryArraySchema = categorySchema.array();

export const realEstatePerCategory = categorySchema.extend({
  realEstate: realEstadeSchemaArray,
});
