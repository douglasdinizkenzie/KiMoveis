import { z } from "zod";
export const createAddresSchema = z.object({
  street: z.string().max(45),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

export const addresSchema = createAddresSchema.extend({
  id: z.number(),
});
