import { z } from "zod";

import { realEstadeSchema } from "./realEstate.schema";
import { userSchema } from "./users.schema";
export const createScheduleSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export const createScheduleSchemaWithoutRealEstate = createScheduleSchema.omit({
  realEstateId: true,
});

export const ScheduleSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string(),
  realEstate: realEstadeSchema,
  user: userSchema,
});

export const scheduleSchemaArray = ScheduleSchema.array();
