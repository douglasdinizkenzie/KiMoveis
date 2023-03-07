import {
  createScheduleSchema,
  createScheduleSchemaWithoutRealEstate,
} from "../schemas/schedules.schema";
import { z } from "zod";

export type tCreateSchedule = z.infer<typeof createScheduleSchema>;
export type tCreateScheduleWithoutRealEstate = z.infer<
  typeof createScheduleSchemaWithoutRealEstate
>;
