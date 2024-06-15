import { type DbProperty } from "~/types/database";
import { browserConcat, operatingSystemConcat } from "./database";

export const GITHUB_LINK = "https://github.com"
export const SUMMARY_ROWS_AMOUNT = 10;
export const MAX_RECORD_PER_PAGE = 20
export const RANKING_MAX_RECORDS=100

export const GroupByProperty: Record<string, DbProperty> = {
  REFERRER: {
    dataProperty: "referrer_name",
    targetProperty: "name",
    targetDB: "Referrer",
  },
  USER_AGENT: {
    dataProperty: "user_agent_name",
    targetProperty: "name",
    targetDB: "UserAgent",
  },
  OPERATING_SYSTEM: {
    dataProperty: "user_agent_name",
    targetProperty: "operating_system",
    targetDB: "UserAgent",
    concatRule: operatingSystemConcat,
  },
  BROWSER: {
    dataProperty: "user_agent_name",
    targetProperty: "browser",
    targetDB: "UserAgent",
    concatRule: browserConcat,
  },
  BROWSER_ENGINE: {
    dataProperty: "user_agent_name",
    targetProperty: "browser_engine",
    targetDB: "UserAgent",
  },
  COUNTRY: {
    dataProperty: "ip",
    targetProperty: "country",
    targetDB: "IpInfo"
  }
}
