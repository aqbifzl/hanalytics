import { Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { useDateContext } from "~/contexts/DateProvider";

interface Props{
  defaultNow?: Dayjs,
  defaultBoundary?: Dayjs
}

export const DatePickers = ({defaultNow=dayjs(), defaultBoundary=dayjs().subtract(1, "month")}: Props) => {
  const {boundary, setBoundary, now, setNow} = useDateContext()

  return (
      <div className="flex">
        <DatePicker className="mx-1 md:mx-2" maxDate={now.subtract(1, "day")} onChange={(val) => setBoundary(val ?? defaultBoundary)} value={boundary}/>
        <Typography className="flex items-center text-center text-3xl font-bold">-</Typography>
        <DatePicker value={now} maxDate={dayjs()} minDate={boundary.add(1, "day")} onChange={(val) => setNow(val ?? defaultNow)}/>
      </div>
  )
}
