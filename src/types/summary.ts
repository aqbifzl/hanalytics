import { type getAll, type groupByProperty } from "~/db/data";
import { type kv } from "./generic"

export interface SummaryRankingEntry{
  title: string
  data: kv[] | string
}

export type PostAllGet = ReturnType<typeof getAll>;
export type GroupByPropertyType = Awaited<ReturnType<typeof groupByProperty>>[]
