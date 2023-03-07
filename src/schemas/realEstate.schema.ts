import { z } from "zod";
import { addresSchema, createAddresSchema } from "./address.schema";
import { categorySchema } from "./categories.schema";
export const createRealEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().positive(),
  address: createAddresSchema,
  categoryId: z.number(),
});

export const realEstadeSchema = z.object({
  id: z.number(),
  sold: z.boolean(),
  value: z.number().or(z.string()),
  size: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  address: addresSchema,
  category: categorySchema,
});

export const realEstadeSchemaArray = realEstadeSchema.array();
