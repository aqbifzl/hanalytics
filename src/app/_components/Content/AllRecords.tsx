"use client"

import { Grid, Pagination, Typography } from "@mui/material"
import { api } from "~/trpc/react"
import { DataTable } from "../DataPresentation/DataTable"
import { GeneralFilters } from "../GeneralFilters"
import { DateProvider } from "~/contexts/DateProvider"
import { ExcludeProvider } from "~/contexts/ExcludeContext"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import { MAX_RECORD_PER_PAGE } from "~/utils/constants"
import { Pending } from "../FetchingDataUtils/Pending"
import { useApplicationContext } from "~/contexts/ApplicationContext"
import { parsedRecordsToTable } from "~/utils/table"

export const AllRecords = () => {
  const {application} = useApplicationContext()
  const [now, setNow] = useState(dayjs())
  const [boundary, setBoundary] = useState(now.subtract(1, "month"))
  const [excludeBots, setExcludeBots] = useState(false)

  const [page, setPage] = useState(1)

  useEffect(() => {
    setNow(dayjs())
    setBoundary(now.subtract(1, "month"))
    setPage(1)
  }, [application])

  const {data, status} = api.allRecords.get.useQuery({
    start: boundary.toDate(),
    end: now.toDate(),
    excludeBots,
    startIndex: (Math.max(page-1, 0)) * MAX_RECORD_PER_PAGE,
    limit: MAX_RECORD_PER_PAGE, application})


  switch(status){
    case "pending":
    return <Pending /> 
    case "error":
      throw new Error("Error fetching data")
    default:
    if(!data)
      throw new Error("Error fetching data")
  }

  const {headers, rows} = parsedRecordsToTable(data.records)

  return (
    <DateProvider now={now} setNow={setNow} boundary={boundary} setBoundary={setBoundary}>
      <ExcludeProvider excludeBots={excludeBots} setExcludeBots={setExcludeBots}>
        <Typography paragraph>
          <Typography paragraph className="flex">
            <GeneralFilters/>
          </Typography>

          <div className="w-full max-w-full">
            <Grid container spacing={2} className="my-4">
              <Grid item xs={12} className="overflow">
                <DataTable 
                  title={"All records"}
                  headers={headers}
                  rows={rows}
                />
                <Pagination 
                  className="my-5"
                  onChange={(_, page: number) => {setPage(page)}}
                  count={Math.ceil(data.totalNumber / MAX_RECORD_PER_PAGE)}
                  page={page}
                  variant="outlined" />
              </Grid>
            </Grid>
          </div>
        </Typography>
    </ExcludeProvider>
  </DateProvider>
  )
}

