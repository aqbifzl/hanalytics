import { getMostRecentRecords, getRecords, groupByProperty } from "~/db/data";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { SummaryInput } from "~/zod/trpc/summary";
import { GroupByProperty, SUMMARY_ROWS_AMOUNT } from "~/utils/constants";
import { getParsedRecords } from "~/utils/records";
import { type GroupByPropertyType } from "~/types/summary";


export const summaryRouter = createTRPCRouter({ 
  get: protectedProcedure
  .input(SummaryInput)
  .query(async ({input}) => {
    const {start, end, excludeBots, application} = input

    const recentRecords = await getParsedRecords(await getMostRecentRecords(application, SUMMARY_ROWS_AMOUNT))
    const requestedRecords = await getParsedRecords(await getRecords(application, start, end, excludeBots))

    const dataToRequest = [
      GroupByProperty.REFERRER!,
      GroupByProperty.USER_AGENT!,
      GroupByProperty.OPERATING_SYSTEM!,
      GroupByProperty.BROWSER!,
      GroupByProperty.BROWSER_ENGINE!,
      GroupByProperty.COUNTRY!
    ]

    const dataStorage: GroupByPropertyType = await Promise.all(dataToRequest.map(async (e) => {
      return await groupByProperty({property: e, application, limit: SUMMARY_ROWS_AMOUNT})
    })) 

    return {
      recentRecords: recentRecords,
      requestedRecords,
      topReferrers: dataStorage[0],
      topUserAgents: dataStorage[1],
      topOSes: dataStorage[2],
      topBrowsers: dataStorage[3],
      topBrowserEngines: dataStorage[4],
      topCountries: dataStorage[5],
    }
  }),
});
