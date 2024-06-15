import { getApplicationsNames } from "~/db/data";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const genericRouter = createTRPCRouter({ 
  getAll: protectedProcedure
  .query(async (): Promise<string[]> => (await getApplicationsNames()).map(e => e.name))
});
