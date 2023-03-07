import { z } from "zod";
import {
  categoryArraySchema,
  categorySchema,
  createCategorySchema,
} from "../schemas/categories.schema";

export type tCreateCategory = z.infer<typeof createCategorySchema>;
export type tCategory = z.infer<typeof categorySchema>;
export type tCategoryArray = z.infer<typeof categoryArraySchema>;
