"use client"

import { type ReactNode, useEffect, useState } from "react"
import { Bar } from "./Bar"
import { api } from "~/trpc/react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { SwitchMenuButton } from "./SwitchMenuButton";
import { MenuEntry } from "./MenuEntry";
import GitHubIcon from "@mui/icons-material/GitHub";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import StorageIcon from "@mui/icons-material/Storage";
import { Drawer, DrawerHeader } from "~/styled/Drawer";
import { useRouter } from "next/navigation";
import { GITHUB_LINK } from "~/utils/constants";
import { Content, ContentManager } from "./ContentManager";
import { Pending } from "./FetchingDataUtils/Pending";
import { ApplicationProvider } from "~/contexts/ApplicationContext";
import { BlankPending } from "./FetchingDataUtils/BlankPending";

interface Entry{
  text: string
  icon: ReactNode
  target: Content
}

const entries: Entry[] = [
  {text: "Main panel", icon: <DataUsageIcon />, target: Content.SUMMARY},
  {text: "Rankings of data", icon: <LeaderboardIcon />, target: Content.RANKING},
  {text: "All records", icon: <StorageIcon />, target: Content.ALL_RECORDS},
]

export const MainDrawer = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false);

  const [currentContent, setCurrentContent] = useState<Content>(Content.SUMMARY)

  const {data: applications, status} = api.generic.getAll.useQuery();
  const [application, setApplication] = useState<string | undefined>(undefined)

  useEffect(() => {
   if(applications) {
     setApplication(applications[0])
   }
  },[applications])

  switch(status){
    case "pending":
    return <BlankPending /> 
    case "error":
    throw new Error("Fatal error with applications fetching")
    case "success":
    if(!applications?.length)
      throw new Error("Fatal error, there's no applications")
  }

  if(!application)
    return <Pending /> 

  return (
    <ApplicationProvider application={application} setApplication={setApplication} allApplications={applications}>
      <Bar />
      <div className="max-w-full max-w">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <DrawerHeader></DrawerHeader>
          <List>
            <SwitchMenuButton open={open} setOpen={setOpen}/>
            <Divider />
            {entries.map((entry, i) => (
              <MenuEntry 
                key={i}
                text={entry.text}
                icon={entry.icon}
                open={open}
                clickCallback={() => setCurrentContent(entry.target)}
              />
            ))}
          </List>
          <Divider />
          <List>
            <MenuEntry open={open} text={"Github"} clickCallback={() => {router.replace(GITHUB_LINK)}} icon={<GitHubIcon/>}/>
          </List>
        </Drawer>
        <Box className="overflow-scroll w-full p-3 md:p-10">
          <DrawerHeader />
          <ContentManager content={currentContent}/>
        </Box>
      </Box>
      </div>
    </ApplicationProvider>
  )
}
