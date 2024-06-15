import { getRecords } from "~/db/data";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { RankingInput } from "~/zod/trpc/ranking";
import { type kv } from "~/types/generic";
import { RankingTopType } from "~/types/ranking";
import { RANKING_MAX_RECORDS } from "~/utils/constants";
import { type Record } from "@prisma/client/runtime/library";

export const rankingRouter = createTRPCRouter({ 
  getTop: protectedProcedure
  .input(RankingInput)
  .query(async ({input}): Promise<kv[]>  => {
    const {start, end, excludeBots, type, application} = input
    const requestedRecords = await getRecords(application, start, end, excludeBots, 0)

    const statistics = requestedRecords.map(r => {
      switch(type){
        case RankingTopType.BROWSER:
          return r.user_agent.browser
        case RankingTopType.OSES:
          return r.user_agent.operating_system
        case RankingTopType.COUNTRIES:
          return r.ip_info.country
        case RankingTopType.REFERRERS:
          return r.referrer?.name ?? "Unknown"
      }
    })

    const reduced = statistics.reduce((acc, val) => {
      if(val){
        const v = acc[val]
        const count = (v ? parseInt(v, 10) : 0) + 1
        acc[val] = count.toString()
      }
      return acc
    }, {} as Record<string, string>)

    return Object.entries(reduced)
    .sort(([, a], [, b]) => parseInt(b) - parseInt(a))
    .slice(0, RANKING_MAX_RECORDS)
    .map(([k, v]) => ({k,v}));
  }),
});

