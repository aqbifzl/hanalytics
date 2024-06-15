import { z } from "zod";

export const SummaryInput = z.object({
  start: z.date(),
  end: z.date(),
  excludeBots: z.boolean(),
  application: z.string()
})
