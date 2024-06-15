import { type GroupByProperty } from "~/utils/constants"

export interface DbProperty{
  dataProperty: string, // referrer_id for example
  targetProperty: string // name name for example
  targetDB: string // Referrer for example
  concatRule?: (nameProp: string) => string
}

export interface TopDataFunctionCallParams{
  property: typeof GroupByProperty[keyof typeof GroupByProperty],
  application: string,
  limit: number | null
}
