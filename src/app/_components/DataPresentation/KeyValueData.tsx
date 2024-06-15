import { Typography } from "@mui/material"
import { DataPresentationItem } from "./DataPresentationItem"
import { type kv } from "~/types/generic"

interface Props{
  title: string
  data: kv[]
}

export const KeyValueData = ({title, data}: Props) => {
  return(
    <DataPresentationItem title={title}>
      <div>
        {data.map(kv => (
          <>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {kv.k}
            </Typography>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              {kv.v}
            </Typography>
          </>
        ))}
      </div>
    </DataPresentationItem>
  )
}
