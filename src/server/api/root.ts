import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { summaryRouter } from "./routers/summary";
import { genericRouter } from "./routers/generic";
import { allRecordsRouter } from "./routers/allRecords";
import { rankingRouter } from "./routers/ranking";

export const appRouter = createTRPCRouter({
  summary: summaryRouter,
  allRecords: allRecordsRouter,
  ranking: rankingRouter,
  generic: genericRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
