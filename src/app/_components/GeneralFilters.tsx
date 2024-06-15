import { Grid } from "@mui/material"
import { ExcludeButtons } from "./ExcludeButtons"
import { DatePickers } from "./DatePickers"

interface Props{
  className?: string
}

export const GeneralFilters = ({className}: Props) =>
  <Grid container className={`${className} lg:flex lg:justify-between lg:w-full`}>
    <Grid xs={12} lg={6}>
      <DatePickers />
    </Grid>
    <Grid xs={12} lg={6}>
      <ExcludeButtons className={"lg:flex lg:justify-end"}/>
    </Grid>
  </Grid>
