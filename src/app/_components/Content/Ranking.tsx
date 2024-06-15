"use client"

import { Select, Typography, MenuItem, Grid } from "@mui/material"
import { api } from "~/trpc/react"
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import FlagIcon from "@mui/icons-material/Flag";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { DataList } from "../DataPresentation/DataList";
import React, { type ReactNode, useState } from "react";
import { GeneralFilters } from "../GeneralFilters";
import { DateProvider } from "~/contexts/DateProvider";
import { ExcludeProvider } from "~/contexts/ExcludeContext";
import dayjs from "dayjs";
import { Pending } from "../FetchingDataUtils/Pending";
import { type Record } from "@prisma/client/runtime/library";
import { useApplicationContext } from "~/contexts/ApplicationContext";
import { RankingTopType } from "~/types/ranking";

interface RankingOption{
  title: string
  icon: ReactNode
}

export const RANKING_OPTIONS_OBJS: Record<RankingTopType, RankingOption> = {
  [RankingTopType.BROWSER]: {title: "Browsers", icon: <TravelExploreIcon/>},
  [RankingTopType.REFERRERS]: {title: "Referrers", icon: <IosShareIcon/>},
  [RankingTopType.OSES]: {title: "OSes", icon: <SettingsSuggestIcon/>},
  [RankingTopType.COUNTRIES]: {title: "Countries", icon: <FlagIcon/>},
}

const DEFAULT_OPTION: RankingTopType = RankingTopType.BROWSER;

export const Ranking = () => {
  const {application} = useApplicationContext()
  const [opt, setOpt] = useState<RankingTopType>(DEFAULT_OPTION);

  const [now, setNow] = useState(dayjs())
  const [boundary, setBoundary] = useState(now.subtract(1, "month"))
  const [excludeBots, setExcludeBots] = useState(false)

  const {data, status} = api.ranking.getTop.useQuery({start: boundary.toDate(), end: now.toDate(), excludeBots, type: opt, application})

  switch(status){
    case "pending":
    return <Pending /> 
    default:
    if(!data)
      throw new Error("Error fetching data")
  }

  return (
    <DateProvider now={now} setNow={setNow} boundary={boundary} setBoundary={setBoundary}>
      <ExcludeProvider excludeBots={excludeBots} setExcludeBots={setExcludeBots}>
        <Typography paragraph>
          <Grid container>
            <Grid item xs={12}>
              <Typography paragraph className="flex">
                <Select
                    labelId="demo-simple-select-label"
                    variant="standard"
                    value={opt}
                    displayEmpty
                    onChange={(val) => setOpt(val.target.value as RankingTopType)}
                    className="shadow-none text-white mx-2"
                >
                  {Object.keys(RANKING_OPTIONS_OBJS).map((key, i) => {
                      const obj = RANKING_OPTIONS_OBJS[key as RankingTopType]

                      return(
                        <MenuItem key={i} value={key}>{obj.icon} <span className="mx-1">{obj.title}</span></MenuItem>
                      )
                    })}
                </Select>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <GeneralFilters />
            </Grid>
          </Grid>

          <div className="w-full max-w-full">
            <Grid container spacing={2} className="my-4">
              <Grid item xs={12}>
                <DataList 
                  title={`Top ${data.length} ${RANKING_OPTIONS_OBJS[opt].title.toLowerCase()}`}
                  data={data}
                />
              </Grid>
            </Grid>
          </div>
        </Typography>
      </ExcludeProvider>
    </DateProvider>
  )
}
