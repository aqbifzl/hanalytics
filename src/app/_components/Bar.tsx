import { Typography, IconButton, Toolbar, FormControl, Select, type SelectChangeEvent, MenuItem, Button } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";
import { useApplicationContext } from "~/contexts/ApplicationContext";
import { AppBar } from "~/styled/Bar";
import { signOut } from "next-auth/react";

export const Bar = () => {
  const {application, setApplication, allApplications} = useApplicationContext()

  return(
    <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AssessmentIcon/>
          </IconButton>
          <div className="flex justify-around w-full items-center">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hanalytics
            </Typography>
            <FormControl variant="standard" className="mx-2 flex">
              <Select
                  labelId="demo-simple-select-label"
                  value={application}
                  variant="standard"
                  displayEmpty
                  onChange={(e: SelectChangeEvent) => setApplication(e.target.value)}
                  className="shadow-none text-white"
              >
                {allApplications.map((app, i) => (
                  <MenuItem key={i} value={app}>{app}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div>
              <Button className="ml-2" onClick={() => signOut()}>logout</Button>
            </div>
          </div>
        </Toolbar>
    </AppBar>
  )
}
