import { Grid, Typography } from "@mui/material"
import { api } from "~/trpc/react"
import { KeyValueData } from "../DataPresentation/KeyValueData";
import { DataList } from "../DataPresentation/DataList";
import { DataTable } from "../DataPresentation/DataTable";
import { GeneralFilters } from "../GeneralFilters";
import { SUMMARY_ROWS_AMOUNT } from "~/utils/constants";
import { useState } from "react";
import dayjs from "dayjs";
import { DateProvider } from "~/contexts/DateProvider";
import { ExcludeProvider } from "~/contexts/ExcludeContext";
import { Pending } from "../FetchingDataUtils/Pending";
import { useApplicationContext } from "~/contexts/ApplicationContext";
import { type kv } from "~/types/generic";
import { type SummaryRankingEntry, type GroupByPropertyType } from "~/types/summary";
import { parsedRecordsToTable } from "~/utils/table";

const GroupedPropertiesToKv = (data?: GroupByPropertyType[0]): kv[] | string => {
  if(!data)
    return "No data"
  const result: kv[] | string = data.map(b => ({k: b.data_res, v: b.count.toString()})).filter(b => !!b.k && !!b.v) ?? "No data"

  return result.length ? result : "No data"
}

export const Summary = () => {
  const {application} = useApplicationContext()

  const [now, setNow] = useState(dayjs())
  const [boundary, setBoundary] = useState(now.subtract(1, "month"))
  const [excludeBots, setExcludeBots] = useState(false)

  const {data, status} = api.summary.get.useQuery({start: boundary.toDate(), end: now.toDate(), excludeBots, application});

  switch(status){
    case "pending":
    return <Pending /> 
    case "error":
    throw new Error("Fatal error with summary data fetching")
  }

  const uniqueIPRecords = Array.from(
    data.requestedRecords.reduce((map, obj) => {
      if(!map.has(obj.ip)){
        map.set(obj.ip, obj)
      }
      return map
    },new Map<string, typeof data.requestedRecords[0]>()).values()
  )

  const kvs: kv[] = [
    {k: "Total unique users", v: uniqueIPRecords.length.toString()},
    {k: "Total bots", v: uniqueIPRecords.filter(r => !!r.isBot).length.toString()},
    {k: "Most popular country", v: data.topCountries?.[0]?.data_res ?? "No data"},
    {k: "Most popular os", v: data.topOSes?.[0]?.data_res ?? "No data"},
    {k: "Most popular browser", v: data.topBrowsers?.[0]?.data_res ?? "No data"},
  ]

  const topData: SummaryRankingEntry[] = [
    {title: `Top ${SUMMARY_ROWS_AMOUNT} browsers`, data:  GroupedPropertiesToKv(data.topBrowsers)},
    {title: `Top ${SUMMARY_ROWS_AMOUNT} operating systems`, data: GroupedPropertiesToKv(data.topOSes)},
    {title: `Top ${SUMMARY_ROWS_AMOUNT} referrers`, data: GroupedPropertiesToKv(data.topReferrers)},
    {title: `Top ${SUMMARY_ROWS_AMOUNT} countries`, data: GroupedPropertiesToKv(data.topCountries)},
  ]

  const {headers, rows} = parsedRecordsToTable(data.recentRecords)

  return (
    <DateProvider now={now} setNow={setNow} boundary={boundary} setBoundary={setBoundary}>
      <ExcludeProvider excludeBots={excludeBots} setExcludeBots={setExcludeBots}>
        <Typography paragraph>
          <Typography className="text-4xl md:text-5xl">
          👋🏻 Welcome back! 
          </Typography>
          <Typography className="text-xl md:text-4xl mt-5">
            Brief summary of <Typography className="text-xl md:text-4xl" component="span" color="primary">{application}</Typography> activity
          </Typography>
          <GeneralFilters className="mt-5"/>

          <div className="w-full max-w-full">
            <Grid container spacing={2} className="my-4">
              <Grid item xs={12}>
                <KeyValueData title={"General data"} data={kvs}/>
              </Grid>
              {topData.map((td, i) => (
                <Grid item xs={12} key={i}>
                  <DataList title={td.title} data={td.data}/>
                </Grid>
              ))}
              <Grid item xs={12} className="overflow">
                <DataTable 
                  title={`Last ${SUMMARY_ROWS_AMOUNT} visitors`}
                  headers={headers}
                  rows={rows}
                />
              </Grid>
            </Grid>
          </div>
        </Typography>
      </ExcludeProvider>
    </DateProvider>
  )
}
