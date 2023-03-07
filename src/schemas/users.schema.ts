import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().optional().default(false),
  password: z.string().max(25),
});

export const userSchema = createUserSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullish(),
  })
  .omit({ password: true });

export const userSchemaArray = userSchema.array();
export const userSchemaUpdate = createUserSchema
  .partial()
  .omit({ admin: true });
