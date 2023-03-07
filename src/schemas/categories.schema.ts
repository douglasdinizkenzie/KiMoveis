import { z } from "zod";
import { realEstadeSchema } from "./realEstate.schema";
export const createCategorySchema = z.object({
  name: z.string(),
});

export const categorySchema = createCategorySchema.extend({
  id: z.number(),
});

export const categoryArraySchema = categorySchema.array();
