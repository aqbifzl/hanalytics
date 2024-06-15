import { Checkbox, FormControlLabel, FormGroup, Typography } from "@mui/material"
import { useExcludeContext } from "~/contexts/ExcludeContext";

interface Props{
  className?: string
}

export const ExcludeButtons = ({className}: Props) => {
  const {excludeBots, setExcludeBots} = useExcludeContext()

  return(
    <FormGroup row className={className}>
      <FormControlLabel checked={excludeBots} control={<Checkbox onChange={(val) => setExcludeBots(val.target.checked)}/>} label={<Typography>No bots</Typography>} />
    </FormGroup>
  )
}
