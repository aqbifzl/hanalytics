import { getRecords, getRecordsNumber } from "~/db/data";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getParsedRecords } from "~/utils/records";
import { GetAllRecordsInput } from "~/zod/trpc/allRecords";
import { type AllRecordsReturnType } from "~/types/allRecords";

export const allRecordsRouter = createTRPCRouter({ 
  get: protectedProcedure
  .input(GetAllRecordsInput)
  .query(async ({input}): Promise<AllRecordsReturnType> => {
    const {start, end ,excludeBots, startIndex, limit, application} = input
    const records = await getParsedRecords(await getRecords(input.application, start, end, excludeBots, startIndex, limit))
    const totalNumber = await getRecordsNumber(application, start, end, excludeBots)

    return {records, totalNumber}
  }),
});
