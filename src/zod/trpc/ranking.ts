import { z } from "zod";
import { RankingTopType } from "~/types/ranking";

export const RankingInput = z.object({
  start: z.date(),
  end: z.date(),
  excludeBots: z.boolean(),
  type: z.nativeEnum(RankingTopType),
  application: z.string()
})
