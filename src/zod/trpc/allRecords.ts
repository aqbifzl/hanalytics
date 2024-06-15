import { z } from "zod";

export const GetAllRecordsInput = z.object({
  start: z.date(),
  end: z.date(),
  excludeBots: z.boolean(),
  startIndex: z.number().min(0),
  limit: z.number(),
  application: z.string()
})
