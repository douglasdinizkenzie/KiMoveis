import { z } from "zod";
import {
  categoryArraySchema,
  categorySchema,
  createCategorySchema,
  realEstatePerCategory,
} from "../schemas/categories.schema";

export type tCreateCategory = z.infer<typeof createCategorySchema>;
export type tCategory = z.infer<typeof categorySchema>;
export type tCategoryArray = z.infer<typeof categoryArraySchema>;
export type tRealEstatePerCategory = z.infer<typeof realEstatePerCategory>;
